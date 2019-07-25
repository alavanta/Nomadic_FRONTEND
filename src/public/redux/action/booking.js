import axios from 'axios';
import packages from '../reducers/packages';

const url = 'http://192.168.6.163:3000';

export const fetchBooking = (token, data) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_BOOKING',
    payload: axios.get(`${url}/booking`, data)
  };
};
