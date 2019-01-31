import * as Types from '../actionTypes';

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
    return {
        type: Types.SET_EPISCODE_SOURCE,
        data: source,
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

// export function test_min() {
//     return { type: Types.TEST_DECREMENT };
// }