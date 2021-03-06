import { fromJS } from 'immutable';

import * as shopListActions from '../actions/shopListActions'; 

const initialState = fromJS([]);

function add(oldState, action){
    let state = oldState
    action.ingredient.inShoppingList = true
    state = state.push(action.ingredient)
    return state
}

function remove(oldState, action){
    let state = oldState
    action.ingredient.inShoppingList = false
    state = state.splice(state.indexOf(action.ingredient), 1)
    return state
}

function pick(oldState, action){
    let state = oldState
    action.ingredient.picked = !action.ingredient.picked
    state = state.splice(state.indexOf(action.ingredient), 1, action.ingredient)
    return state
}



export function shopListReducer(state = initialState, action) {
    switch (action.type) {
        case shopListActions.actions.remove:
            return remove(state,action)
        case shopListActions.actions.add:
            return add(state,action)
        case shopListActions.actions.pick:
            return pick(state,action)
      default:
        return state;
    }
  }