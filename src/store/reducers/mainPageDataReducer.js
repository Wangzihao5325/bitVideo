import * as Types from '../actionTypes';

const initialState = {
    data: null,
    typeArr: null,
    nowType: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_MAIN_PAGE_DATA:
            return {
                ...state,
                data: action.data
            };
        case Types.SET_GLOBAL_TYPE_DATA:
            return {
                ...state,
                typeArr: action.typeArr
            };
        case Types.SET_NOW_GLOBAL_TYPE:
            return {
                ...state,
                nowType: action.nowType
            };
        default: return state;
    }
};
export default reducer;