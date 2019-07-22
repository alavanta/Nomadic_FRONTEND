import axios from 'axios';
import login from '../reducers/login';

const url = 'our_backend_route';

export const login = () => {
    return {
        type:'login',
        payload: axios.get(`${url}`)
    }
}