import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  token: null,
  isLoading: false,
  isError: false,
  isFinish: false
};

export default (user = async (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_PENDING':
    case 'ADD_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_USER_REJECTED':
    case 'ADD_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinish: false
      };
    case 'FETCH_USER_FULFILLED':
      console.log(action.payload.data.data[0].phone);
      await AsyncStorage.setItem('token', action.payload.data.token);
      await AsyncStorage.setItem('user', action.payload.data.data[0].phone);
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
        data: action.payload.data.nomadic.data
      };
    default:
      return state;
  }
});
