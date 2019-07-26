import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  token: null,
  isLoading: false,
  isError: false,
  isFinish: false
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
    case 'FETCH_USER_PENDING':
    case 'ADD_USER':
    case 'ADD_USER_PENDING':
    case 'EDIT_USER_PENDING':
    case 'ADD_NEW_PASSWORD':
    case 'ADD_NEW_PASSWORD_PENDING':
    case 'FORGET_PASSWORD':
    case 'FORGET_PASSWORD_PENDING':
    case 'GET_USER_BY_ID':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_USER_REJECTED':
    case 'ADD_USER_REJECTED':
    case 'EDIT_USER_REJECTED':
    case 'ADD_NEW_PASSWORD_REJECTED':
    case 'FORGET_PASSWORD_REJECTED':
    case 'GET_USER_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinish: false
      };
    case 'FETCH_USER_FULFILLED':
      AsyncStorage.setItem('token', action.payload.data.token);
      AsyncStorage.setItem('user', action.payload.data.data[0].phone);
      AsyncStorage.setItem('userName', action.payload.data.data[0].name);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data: action.payload.data.data,
        token: action.payload.data.token
      };
    case 'ADD_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data: action.payload.data.nomadic.data[0]
        // data: action.payload.data[0]
      };
    case 'EDIT_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data: state.data.map(users => {
          (users.id = parseInt(action.payload.data.rowss[0].id))
            ? action.payload.data.rowss[0]
            : users;
        })
      };
    case 'ADD_PASSWORD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data: action.payload.data.data
      };
    case 'ADD_NEW_PASSWORD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data: action.payload.data.data
      };
    case 'GET_USER_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data: action.payload.data.data
      };
    default:
      return state;
  }
});
