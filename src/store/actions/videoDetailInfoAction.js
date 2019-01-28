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

// export function test_min() {
//     return { type: Types.TEST_DECREMENT };
// }