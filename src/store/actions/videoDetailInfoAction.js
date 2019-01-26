import * as Types from '../actionTypes';

export function set_video_full_data(fullData) {
    let source = fullData.resource;
    let author = fullData.author;
    let videoType = fullData.type;
    return {
        type: Types.SET_VIDEO_FULL_DATA,
        data: fullData,
        source: source,
        author: author,
        videoType: videoType
    };
}

// export function test_min() {
//     return { type: Types.TEST_DECREMENT };
// }