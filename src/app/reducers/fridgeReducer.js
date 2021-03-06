import { fromJS } from 'immutable';

import * as fridgeActions from '../actions/fridgeActions'; 


const initialState = fromJS([]);

function add(oldState, action){
    let state = oldState
    action.ingredient.inFridge = true
    state = state.push(action.ingredient)
    return state
}

function remove(oldState, action){
    let state = oldState
    action.ingredient.inFridge = false
    state = state.splice(state.indexOf(action.ingredient), 1)
    return state
}


export function fridgeReducer(state = initialState, action) {
    switch (action.type) {
        case fridgeActions.actions.remove:
            return remove(state,action)
        case fridgeActions.actions.add:
            return add(state,action)
      default:
        return state;
    }
}
