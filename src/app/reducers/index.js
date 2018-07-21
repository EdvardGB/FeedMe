import { combineReducers } from 'redux-immutable';
import { mainReducer } from './mainReducer';
import { recipeReducer } from './recipeReducer';
import { shopListReducer } from './shopListReducer';
import { fridgeReducer } from './fridgeReducer';

export default function createReducer() {
  return combineReducers({
    main: mainReducer,
    recipes: recipeReducer,
    shopList: shopListReducer,
    fridge: fridgeReducer
  });
}
