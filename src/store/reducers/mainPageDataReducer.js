import * as Types from '../actionTypes';

const initialState = {
    data: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_MAIN_PAGE_DATA:
            return {
                ...state,
                data: action.data
            };
        default: return state;
    }
};
export default reducer;