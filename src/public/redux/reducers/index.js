import { combineReducers } from 'redux';

import login from './login';

const appReducer = combineReducers({
    login
});

export default appReducer;