import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import configureStore from "../configureStore";
import { addBug, getUnresolvedBugs, loadBugs, resolveBug } from "../bugs";

describe("bugSlice", () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const bugsSlice = () => store.getState().entities.bugs;
  const createState = () => ({
    entities: {
      bugs: {
        list: [],
      },
    },
  });

  it("should add the bug to the store if it is saved to the server", async () => {
    const bug = { description: "a" };
    const savedBug = { ...bug, id: 1 };
    fakeAxios.onPost("/bugs").reply(200, savedBug);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toContainEqual(savedBug);
  });

  it("should not add the bug to the store if it is not saved to the server", async () => {
    const bug = { description: "a" };
    fakeAxios.onPost("/bugs").reply(500);

    await store.dispatch(addBug(bug));

    expect(bugsSlice().list).toHaveLength(0);
  });

  describe("selectors", () => {
    it("getUnresolvedBugs", () => {
      const state = createState();
      state.entities.bugs.list = [
        { id: 1, resolved: true },
        { id: 1 },
        { id: 1 },
      ];

      const result = getUnresolvedBugs(state);

      expect(result).toHaveLength(2);
    });
  });

  it("should mark the bug as resolved if it's saved to the server", async () => {
    // Arrange
    fakeAxios.onPatch("/bugs/1").reply(200, {
      id: 1,
      resolved: true,
    });
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    // Act
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    // Assert
    expect(bugsSlice().list[0].resolved).toBe(true);
  });

  it("should not mark the bug as resolved if it's not saved to the server", async () => {
    // Arrange
    fakeAxios.onPatch("/bugs/1").reply(500);
    fakeAxios.onPost("/bugs").reply(200, { id: 1 });

    // Act
    await store.dispatch(addBug({}));
    await store.dispatch(resolveBug(1));

    // Assert
    expect(bugsSlice().list[0].resolved).not.toBe(true);
  });

  describe("loading bugs", () => {
    describe("if the bugs exist in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        await store.dispatch(loadBugs());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });

    describe("if the bugs do not exist in the cache", () => {
      it("should be fetched from the server and put in the store", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        expect(bugsSlice().list).toHaveLength(1);
      });
    });

    describe("loading indicator", () => {
      it("should be true while fetching bugs", () => {
        fakeAxios.onGet("/bugs").reply(() => {
          expect(bugsSlice().loading).toBe(true);
          return [200, [{ id: 1 }]];
        });

        store.dispatch(loadBugs());
      });

      it("should be false after the bugs are fetched", async () => {
        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());
        expect(bugsSlice().loading).toBe(false);
      });

      it("should be false  if the server returns an error", async () => {
        fakeAxios.onGet("/bugs").reply(500);

        await store.dispatch(loadBugs());
        expect(bugsSlice().loading).toBe(false);
      });
    });
  });
});
