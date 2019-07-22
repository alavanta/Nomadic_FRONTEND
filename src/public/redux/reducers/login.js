const initialState = {
    isLoading:false,
}

export default login = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_LOGIN':
            return {
                ...state,
                isLoading:false
            }
        default:
            return state;
    }
}