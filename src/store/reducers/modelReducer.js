import * as Types from '../actionTypes';

const initialState = {
    messageModelIsShow: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.MESSAGE_MODEL_SHOW_STATE_CHANGE:
            return {
                ...state,
                messageModelIsShow: action.state,
            };
        default: return state;
    }
};
export default reducer;