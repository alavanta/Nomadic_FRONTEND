import axios from 'axios';
import packages from '../reducers/packages';

const url = require('./url').url;

export const fetchBooking = (token, data) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_BOOKING',
    payload: axios.get(`${url}/booking`, data)
  };
};

export const fetchBookingById = (token, id) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_BOOKING_BY_ID',
    payload: axios.get(`${url}/booking/byId/${id}`)
  };
};
