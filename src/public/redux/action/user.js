import axios from 'axios';
import login from '../reducers/user';

const url = require('./url').url;

export const fetchUser = data => {
  return {
    type: 'FETCH_USER',
    payload: axios.post(`${url}/users/login`, data)
  };
};

export const addUser = (name, password, email, phone, address, gender) => {
  return {
    type: 'ADD_USER',
    payload: axios.post(`${url}/users/register`, {
      name: name,
      password: password,
      email: email,
      phone: phone,
      address: address,
      gender: gender
    })
  };
};

export const editUser = (id, name, password, email, phone, address, gender) => {
  return {
    type: 'EDIT_USER',
    payload: axios.put(`${url}/users/${id}`, {
      name: name,
      password: password,
      email: email,
      phone: phone,
      address: address,
      gender: gender
    })
  };
};

export const forgetPassword = email => {
  return {
    type: 'FORGET_PASSWORD',
    payload: axios.post(`${url}/reset_password/send`, email)
  };
};

export const addNewPassword = (code, newPass) => {
  return {
    type: 'ADD_NEW_PASSWORD',
    payload: axios.post(`${url}/reset_password`, {
      code: code,
      newPass: newPass
    })
  };
};

export const getUserById = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'GET_USER_BY_ID',
    payload: axios.get(`${url}/users`)
  };
};
