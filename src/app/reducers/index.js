import { combineReducers } from 'redux-immutable';
import { mainReducer } from './mainReducer';
import { recipeReducer } from './recipeReducer';
import { shopListReducer } from './shopListReducer';


export default function createReducer() {
  return combineReducers({
    main: mainReducer,
    recipes: recipeReducer,
    shopList: shopListReducer
  });
}
