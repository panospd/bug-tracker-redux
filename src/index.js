import { bugAdded, bugResolved } from "./store/bugs";
import { projectAdded } from "./store/projects";
import configureStore from "./store/configureStore";

const store = configureStore();

store.dispatch(projectAdded({ name: "Project 1" }));

// const unsubscribe = store.subscribe(() => {
//   console.log("Store changed!", store.getState());
// });

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));

// store.dispatch(bugResolved({ id: 1 }));
