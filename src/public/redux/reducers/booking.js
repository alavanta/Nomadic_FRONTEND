const initialState = {
  booking: [],
  isLoading: false,
  isError: false,
  isFinish: false
};

export default (booking = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKING':
    case 'FETCH_BOOKING_PENDING':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'FETCH_BOOKING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinish: false
      };
    case 'FETCH_BOOKING_FULFILLED':
      console.log(action.payload.data)
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true,
        booking: action.payload.data.nomadic.result
      };
    default:
      return state;
  }
});
