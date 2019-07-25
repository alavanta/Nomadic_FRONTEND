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

export const forgotPass = (email) => {
    console.warn('masuk')
    return {
        type : 'FORGOT_PASS',
        payload: axios.post(`${url}/reset_password/send`,{
            email : email
        })
    }
}

export const changePass = (code,newPass) => {
    console.warn('masuk change pass')
    return {
        type: 'CHANGE_PASS',
        payload: axios.post(`${url}/reset_password`,{
            code : code,
            newPass: newPass
        })
    }
}