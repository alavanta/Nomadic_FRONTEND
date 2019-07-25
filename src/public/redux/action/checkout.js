import axios from 'axios';

const url = 'http://192.168.6.163:3000';

export const addCheckout = (token, data) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'ADD_CHECKOUT',
    payload: axios.post(`${url}/transaction/payment`, data)
  };
};
