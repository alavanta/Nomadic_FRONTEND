import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isFinish: false
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PACKAGES_PENDING':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_PACKAGES_REJECTED':
    case 'ADD_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinish: false
      };
    case 'FETCH_PACKAGES_FULFILLED':
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
