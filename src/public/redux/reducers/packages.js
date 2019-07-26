import { AsyncStorage } from 'react-native';
const initialState = {
  data: [],
  package: null,
  isLoading: false,
  isError: false,
  isFinish: false,
  tourGuide:[],
  testimonial:[]
};

export default (user = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PACKAGES':
    case 'FETCH_PACKAGES_BY_ID':
    case 'FETCH_TOUR_GUIDE':
    case 'FETCH_PACKAGES_PENDING':
    case 'FETCH_PACKAGES_BY_ID_PENDING':
    case 'FETCH_TOUR_GUIDE_PENDING':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_PACKAGES_REJECTED':
    case 'FETCH_PACKAGES_BY_ID_REJECTED':
    case 'ADD_USER_REJECTED':
    case 'FETCH_TOUR_GUIDE_REJECTED':
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
    case 'FETCH_PACKAGES_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        package: action.payload.data.data
      };
    case 'FETCH_TOUR_GUIDE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        tourGuide: action.payload.data.data
      };
    case 'FETCH_TESTIMONIAL_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isError: false,
          isFinish: true,
          testimonial: action.payload.data.data
        };
    default:
      return state;
  }
});
