const initialState = {
  booking: [],
  bookingById: null,
  isLoading: false,
  isError: false,
  isFinish: false
};

export default (booking = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKING':
    case 'FETCH_BOOKING_PENDING':
    case 'FETCH_BOOKING_BY_ID':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_BOOKING_REJECTED':
    case 'FETCH_BOOKING_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinish: false
      };
    case 'FETCH_BOOKING_FULFILLED':
      console.log(action.payload.data);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        booking: action.payload.data.nomadic.result
      };
    case 'FETCH_BOOKING_BY_ID_FULFILLED':
      console.log(action.payload.data.nomadic.result[0]);
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        bookingById: action.payload.data.nomadic.result[0]
      };
    default:
      return state;
  }
});
