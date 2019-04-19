import * as Types from '../actionTypes';

const initialState = {
    isConnection: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.CHANGE_NET_STATE:
            return {
                ...state,
                isConnection: action.nowState
            };
        default: return state;
    }
};
export default reducer;