import { AsyncStorage } from 'react-native';
const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isFinish: false
};

export default (user = async (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PACKAGES_PENDING':
        case 'GET_DESTINATION_PENDING':
            return {
                ...state,
                isLoading: true,
                isFinish: false
            };
        case 'GET_PACKAGES_REJECTED':
        case 'GET_DESTINATION_REJECTED':
            console.warn('masuk reject')
            return {
                ...state,
                isLoading: false,
                isError: true,
                isFinish: false
            };
        case 'GET_PACKAGES_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isFinish: true,
                data: payload.data.data
            }
        case 'GET_DESTINATION_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isFinish: true,
                data: payload.data.data
            }
        default:
            return state;
    }
});
