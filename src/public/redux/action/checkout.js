import axios from 'axios';

const url = require('./url').url;

export const addCheckout = (token, data) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'ADD_CHECKOUT',
    payload: axios.post(`${url}/transaction/payment`, data)
  };
};
