import { combineReducers } from 'redux';
import userReducer from './nodes/entities/user/reducer';

export default combineReducers({
  user: userReducer,
});
