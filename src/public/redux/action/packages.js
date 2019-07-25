import axios from 'axios';
import packages from '../reducers/packages';

const url = 'http://192.168.6.184:3000';

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
