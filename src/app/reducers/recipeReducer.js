import { fromJS } from 'immutable';

import * as recipeActions from '../actions/recipeAction'; 

const initialState = fromJS([]);

function add(oldState, action){
    let state = oldState
    state = state.push(action.recipe)
    return state
}



export function recipeReducer(state = initialState, action) {
    switch (action.type) {
        case recipeActions.actions.add:
            return add(state,action)
      default:
        return state;
    }
  }