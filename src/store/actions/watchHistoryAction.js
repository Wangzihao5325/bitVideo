import * as Types from '../actionTypes';

export function get_history_movie_list(data) {
    return { type: Types.GET_HISTORY_MOVIE_LIST, data: data };
}

export function clear_history_movie_list() {
    return { type: Types.CLEAR_HISTORY_MOVIE_LIST };
}

export function change_history_edit_state() {
    return { type: Types.CHANGE_HISTORY_EDIT_MODE };
}

export function history_edit_select_all() {
    return { type: Types.HISTORY_EDIT_SELECT_ALL };
}

export function history_clear_state() {
    return { type: Types.HISTORY_CLEAR_STATE };
}