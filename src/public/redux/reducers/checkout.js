const initialState = {
  data: [],
  package: null,
  isLoading: false,
  isError: false,
  isFinish: false
};

export default (checkout = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_CHECKOUT':
    case 'ADD_CHECKOUT_PENDING':
      return {
        ...state,
        isLoading: true,
        isFinish: false
      };
    case 'ADD_CHECKOUT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isFinish: false
      };
    case 'ADD_CHECKOUT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        isFinish: true
      };
    default:
      return state;
  }
});
