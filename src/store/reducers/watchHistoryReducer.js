import * as Types from '../actionTypes';

const initialState = {
    historyMovies: [],
    isEdit: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_HISTORY_MOVIE_LIST:
            return {
                ...state,
                historyMovies: action.data
            };
        case Types.CLEAR_HISTORY_MOVIE_LIST:
            return {
                ...initialState
            };
        case Types.CHANGE_HISTORY_EDIT_MODE:
            {
                let editState = state.isEdit;
                let newState = null;
                if (editState) {
                    newState = false;
                } else {
                    newState = true;
                }
                return {
                    ...state,
                    isEdit: newState
                };
            }
        default: return state;
    }
};
export default reducer;