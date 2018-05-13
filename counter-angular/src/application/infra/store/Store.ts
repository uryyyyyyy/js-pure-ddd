import {combineReducers, createStore} from "redux";
import {countReducer} from "./CountReducer";

export const store = createStore(
    combineReducers({
        count: countReducer
    })
)