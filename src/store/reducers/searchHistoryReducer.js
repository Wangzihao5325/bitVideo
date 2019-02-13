import * as Types from '../actionTypes';

const initialState = {
    data: [],
    isShow: false
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
        default: return state;
    }
};
export default reducer;