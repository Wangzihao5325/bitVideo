import * as Types from '../actionTypes';

export function get_history_movie_list(data) {
    return { type: Types.GET_HISTORY_MOVIE_LIST, data: data };
}

export function clear_history_movie_list() {
    return { type: Types.CLEAR_HISTORY_MOVIE_LIST };
}