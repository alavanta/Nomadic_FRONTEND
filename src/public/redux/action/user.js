import axios from 'axios';
import login from '../reducers/user';

const url = 'http://192.168.6.184:3000';

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

export const editUser = (id,name,password,email,phone,address,gender) => {
    return {
        type : 'EDIT_USER',
        payload: axios.put(`${url}/users/${id}`,{
            name : name,
            password:password,
            email: email,
            phone: phone,
            address: address,
            gender: gender
        })
    }
}

export const forgetPassword = (email) => {
    return {
        type : 'FORGET_PASSWORD',
        payload: axios.post(`${url}/forget_password/send`, email)
    }
}

export const addNewPassword = (code, newPass) => {
    return {
        type: 'ADD_NEW_PASSWORD',
        payload: axios.post(`${url}/forget_password`, {
            code: code,
            newPass: newPass
        })
    }
}