import axios from 'axios';
import packages from '../reducers/packages';

const url = require('./url').url;

export const fetchPackages = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_PACKAGES',
    payload: axios.get(`${url}/packages`)
  };
};

export const fetchPackageById = (token, id) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return {
    type: 'FETCH_PACKAGES_BY_ID',
    payload: axios.get(`${url}/packages/${id}`)
  };
};
