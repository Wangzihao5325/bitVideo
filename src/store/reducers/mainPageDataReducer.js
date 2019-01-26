import * as Types from '../actionTypes';
import _ from 'lodash';

const initialState = {
    data: null,
    typeArr: null,
    nowType: null,
    totalPage: 0,
    nowPage: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_MAIN_PAGE_DATA:
            return {
                ...state,
                data: action.data,
                nowType: action.data[0].global_type
            };
        case Types.ADD_MAIN_PAGE_DATA:
            {
                let newData = _.concat(state.data, action.data);
                console.log('qwqwqwqwqwqwqw');
                console.log(newData);
                return {
                    ...state,
                    data: newData,
                };
            }
        case Types.SET_GLOBAL_TYPE_DATA:
            return {
                ...state,
                typeArr: action.typeArr
            };
        case Types.SET_NOW_GLOBAL_TYPE://无特殊情况不使用
            return {
                ...state,
                nowType: action.nowType
            };
        case Types.SET_MAIN_CONTENT_PAGE_INFO:
            return {
                ...state,
                nowPage: action.nowPage,
                totalPage: action.totalPage
            };
        default: return state;
    }
};
export default reducer;