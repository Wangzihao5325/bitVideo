import * as Types from '../actionTypes';

const initialState = {
    isLock: 'false'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_LOCK:
            return {
                ...state,
                isLock: action.isLock
            };
        default: return state;
    }
};
export default reducer;