import * as Types from '../actionTypes';

export function set_video_url_and_type(url, type) {
    return {
        type: Types.SET_VIDEO_URL_AND_TYPE,
        videoUrl: url,
        videoType: type
    };
}

export function clear_video_url_and_type() {
    return {
        type: Types.CLEAR_VIDEO_URL_AND_TYPE,
    };
}