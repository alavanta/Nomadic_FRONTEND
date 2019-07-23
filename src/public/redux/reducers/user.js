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
    case 'EDIT_USER_PENDING':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_USER_REJECTED':
    case 'ADD_USER_REJECTED':
    case 'EDIT_USER_REJECTED':
      console.warn('masuk reject')
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
        data: action.payload.data.nomadic.data[0]
        // data: action.payload.data[0]
      };
    case 'EDIT_USER_FULFILLED':
      console.warn('masuk full ',action.payload.data.rowss[])
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        data : state.data.map(users => {
          (users.id = parseInt(action.payload.data.rowss[0].id)) ?
                      action.payload.data.rowss[0] : users
        })
      }
    default:
      return state;
  }
});
