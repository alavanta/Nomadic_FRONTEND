import axios from 'axios';
import packages from '../reducers/packages';

const url = require('./url').url;

export const fetchPackages = (token, search) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if(search == '' || search == undefined){
    search = ''
  }
  return {
    type: 'FETCH_PACKAGES',
    payload: axios.get(`${url}/packages?search=${search}`)
  };
};

export const fetchPackageById = (token, id) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_PACKAGES_BY_ID',
    payload: axios.get(`${url}/packages/${id}`)
  };
};

export const fetchTourGuide = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_TOUR_GUIDE',
    payload: axios.get(`${url}/tourGuide/status/1`)
  };
};
