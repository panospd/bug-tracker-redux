import { loadBugs, assignBugToUser } from "./store/bugs";
import configureStore from "./store/configureStore";

const store = configureStore();
// store.dispatch(loadBugs());

store.dispatch(loadBugs());

setTimeout(() => {
  store.dispatch(assignBugToUser(1, 4));
}, 2000);

// store.dispatch(userAdded({ name: "Panos" }));
// store.dispatch(userAdded({ name: "Chris" }));

// store.dispatch(projectAdded({ name: "Project 1" }));
// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugAssignedToUser({ bugId: 1, userId: 1 }));
// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch((dispatch, getState) => {
//   dispatch({ type: "bugsReceived", bugs: [1, 2, 3] });
//   console.log(getState());
// });

// store.dispatch({
//   type: "error",
//   payload: {
//     message: "An error occured",
//   },
// });

// const bugs = getBugsByUser(1)(store.getState());

// const unresolvedBugs = getUnresolvedBugs(store.getState());
