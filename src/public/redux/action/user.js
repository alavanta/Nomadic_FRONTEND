import axios from 'axios';
import login from '../reducers/user';

const url = 'http://192.168.6.163:3000';

export const fetchUser = (data) => {
    return {
        type:'FETCH_USER',
        payload: axios.post(`${url}/users/login`,data)
    }
}

export const addUser = (name,password,email,phone,address,gender) => {
    return {
        type: 'ADD_USER',
        payload: axios.post(`${url}/users/register`, {
            name : name,
            password:password,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        })
    }
}

export const editUser = (name,password,email,phone,address,gender) => {
    return {
        type : 'EDIT_USER',
        payload: axios.put(`${url}/users/1`,{
            name : name,
            password:password,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        })
    }
}