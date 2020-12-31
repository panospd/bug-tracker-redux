import {
  bugAdded,
  bugResolved,
  getUnresolvedBugs,
  bugAssignedToUser,
  getBugsByUser,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { userAdded } from "./store/users";
import configureStore from "./store/configureStore";

const store = configureStore();

// store.dispatch(userAdded({ name: "Panos" }));
// store.dispatch(userAdded({ name: "Chris" }));

// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

store.dispatch((dispatch, getState) => {
  dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
  console.log(getState());
});

store.dispatch({
  type: "error",
  payload: {
    message: "An error occured",
  },
});

const bugs = getBugsByUser(1)(store.getState());

const unresolvedBugs = getUnresolvedBugs(store.getState());
