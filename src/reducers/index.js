import { combineReducers } from 'redux';

import userReducer from './userReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  userReducer,
  itemsReducer,
});