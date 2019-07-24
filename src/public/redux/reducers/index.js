import { combineReducers } from 'redux';

import user from './user';
import packages from './packages'

const appReducer = combineReducers({
    user,
    packages
});

export default appReducer;