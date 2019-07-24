import axios from 'axios';

const url = 'http://192.168.6.184:3000';


export const getPackages = (pacId) => {
    return {
        type : 'GET_PACKAGES',
        payload : axios.get(`${url}/packages/${pacId}`)
    }
}

export const getDestination = (desID) => {
    return {
        type: 'GET_DESTINATION',
        payload : axios.get(`${url}/packages/destinations/${desID}`)
    }
}