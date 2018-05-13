import {Count} from "../../../domain/entities/Count";
import {Action, Reducer} from "redux";

export interface IncrementAction extends Action {
  customAction: true
  type: 'INCREMENT';
  num: number
}

export interface DecrementAction extends Action {
  customAction: true
  type: 'DECREMENT'
  num: number
}

export interface UpdateAction extends Action {
  customAction: true
  type: 'UPDATE';
  count: Count
}

export type Actions = IncrementAction | DecrementAction | UpdateAction;

export const countReducer: Reducer<Count, Action> = (state = new Count(0), action: Action | Actions) => {
  if (!('customAction' in action)) {
    return state
  }
  switch (action.type){
    case 'INCREMENT':
      return state.increment(action.num)
    case 'DECREMENT':
      return state.decrement(action.num)
    case 'UPDATE':
      return action.count
    default:
      const _action: never = action;
      console.warn(_action)
      return state
  }
}