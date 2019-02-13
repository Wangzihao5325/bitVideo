import * as Types from '../actionTypes';

const initialState = {
    data: [],
    isShow: false,
    isResult: false,
    resultData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.ADD_SEARCH_HISTORY:
            return {
                ...state,
                data: action.data,
                isShow: action.isShow
            };
        case Types.GET_SEARCH_HISTORY:
            return {
                ...state,
                data: action.data,
                isShow: action.isShow
            };
        case Types.CLEAR_SEARCH_HISTORY:
            return {
                ...state,
                data: action.data,
                isShow: action.isShow
            };
        case Types.GET_SEARCH_RESULT_DATA:
            return {
                ...state,
                resultData: action.result,
                isResult: action.isResult
            };
        default: return state;
    }
};
export default reducer;