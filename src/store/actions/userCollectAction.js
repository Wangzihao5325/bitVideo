import * as Types from '../actionTypes';

export function get_collect_movie_list(data) {
    return { type: Types.GET_COLLECT_MOVIE_LIST, data: data };
}

export function clear_collect_movie_list() {
    return { type: Types.CLEAR_COLLECT_MOVIE_LIST };
}

export function change_collect_edit_state() {
    return { type: Types.CHANGE_COLLECT_EDIT_MODE };
}

export function collect_edit_select_all() {
    return { type: Types.COLLECT_EDIT_SELECT_ALL };
}

export function collect_clear_state() {
    return { type: Types.COLLECT_CLEAR_STATE };
}