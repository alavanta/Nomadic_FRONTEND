import { combineReducers } from 'redux';

import user from './user';
import packages from './packages';
import booking from './booking';

const appReducer = combineReducers({
  user,
  packages,
  booking
});

export default appReducer;
