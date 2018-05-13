import {createStore} from "redux";
import {countReducer} from "./CountReducer";

export const store = createStore(countReducer)
