import * as Types from '../actionTypes';
import _ from 'lodash';

export function set_video_full_data(fullData) {
    let source = fullData.resource;
    let author = fullData.author;
    let videoType = fullData.type;
    let recommendAndNegative = {
        recommend_sum: fullData.recommend_sum,
        negative_sum: fullData.negative_sum,
        user_recommend: fullData.user_recommend,
        user_negative: fullData.user_negative,
    };
    return {
        type: Types.SET_VIDEO_FULL_DATA,
        data: fullData,
        source: source,
        author: author,
        videoType: videoType,
        recommendAndNegative: recommendAndNegative
    };
}

export function refresh_video_recommend_negative_data(recommend_sum, negative_sum, user_recommend, user_negative) {
    let data = {
        recommend_sum,
        negative_sum,
        user_recommend,
        user_negative
    };
    return {
        type: Types.REFRESH_VIDEO_RECOMMEND_NEGATIVE_DATA,
        data: data
    };
}

export function set_episode_source(source, episodeTotalNum, videoSourceName) {
    let ObjZero = source[0];
    let ObjOne = _.assign({}, ObjZero);
    ObjZero.play_series = '标准';
    ObjZero.play_url_h5 = ObjZero.shift_360_filename;
    ObjOne.play_series = '高清';
    ObjOne.play_url_h5 = ObjOne.shift_720_filename;
    return {
        type: Types.SET_EPISCODE_SOURCE,
        data: [ObjZero, ObjOne],
        episodeTotalNum: episodeTotalNum,
        videoSourceName: videoSourceName
    }
}

export function set_guess_like_source(source) {
    return {
        type: Types.SET_GUESS_LIKE_SOURCE,
        data: source,
    }
}

export function set_comment_list_data(data) {
    return {
        type: Types.SET_COMMENT_LIST_DATA,
        data: data,
    }
}

export function video_detail_data_reset() {
    return {
        type: Types.VIDEO_DETAIL_DATA_RESET,
    }
}

export function video_detail_add_myself_comment(data) {
    return {
        type: Types.VIDEO_DETAIL_ADD_MYSELF_COMMENT,
        data: data
    }
}

export function change_video_collect_state(state) {
    return { type: Types.VIDEO_DETAIL_CHANGE_COLLECT_STATE, newState: state };
}