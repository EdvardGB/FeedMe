import { combineReducers } from 'redux-immutable';
import { mainReducer } from './mainReducer';

export default function createReducer() {
  return combineReducers({
    main: mainReducer
  });
}
