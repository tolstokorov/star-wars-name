import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import people from "./reducers/people";

const store = createStore(combineReducers({
    people
}), applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;

export default store;