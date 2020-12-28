import { bugAdded, bugRemoved, bugResolved } from "./actions";
import * as actions from "./actionTypes";
import store from "./store";

const unsubscribe = store.subscribe(() => {
  console.log("Store changed!", store.getState());
});

// store.dispatch(bugAdded("Bug1"));
// store.dispatch(bugAdded("Bug2"));
// store.dispatch(bugAdded("Bug3"));

// store.dispatch(bugResolved(1));

console.log(store.getState());
