import * as Types from '../actionTypes';

const initialState = {
    historyMovies: []
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
        default: return state;
    }
};
export default reducer;