import * as Types from '../actionTypes';

const initialState = {
    historyMovies: [],
    isEdit: false,
    selectAll: false,
    deleteSet: new Set(),
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_HISTORY_MOVIE_LIST:
            return {
                ...state,
                historyMovies: action.data,
                isEdit: false,
                selectAll: false,
                deleteSet: new Set(),
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
        case Types.HISTORY_EDIT_SELECT_ALL:
            {
                let selectAll = state.selectAll;
                let newState = null;
                if (selectAll) {
                    newState = false;
                    state.deleteSet.clear();
                } else {
                    newState = true;
                    state.historyMovies.forEach((item) => {
                        state.deleteSet.add(item.id);
                    });
                }
                return {
                    ...state,
                    selectAll: newState
                };
            }
        case Types.HISTORY_CLEAR_STATE:

            return {
                ...state,
                isEdit: false,
                selectAll: false,
                deleteSet: new Set()
            };
        default: return state;
    }
};
export default reducer;