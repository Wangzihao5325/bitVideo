import * as Types from '../actionTypes';
import _ from 'lodash';

const initialState = {
    data: [],
    isShow: false,
    isResult: false,
    resultData: [],
    nowPage: -1,
    lastPage: -1,
    title: ''
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
                isResult: action.isResult,
                nowPage: action.nowPage,
                lastPage: action.lastPage,
                title: action.title
            };
        case Types.APPEND_SEARCH_RESULT_DATA:
            let newData = _.concat(state.resultData, action.result);
            return {
                ...state,
                resultData: newData,
                nowPage: action.nowPage,
                lastPage: action.lastPage,
            };
        case Types.RESET_SEARCH_RESULT_DATA:
            return {
                ...state,
                isResult: false,
                resultData: [],
                nowPage: -1,
                lastPage: -1,
                title: ''
            };
        default: return state;
    }
};
export default reducer;