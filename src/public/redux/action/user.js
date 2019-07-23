import axios from 'axios';
import login from '../reducers/user';

const url = 'http://192.168.6.184:3000';

export const fetchUser = (data) => {
    return {
        type:'FETCH_USER',
        payload: axios.post(`${url}/users/login`,data)
    }
}

export const addUser = (data) => {
    return {
        type: 'ADD_USER',
        payload: axios.post(`${url}/users/register`, data)
    }
}