import * as Types from '../actionTypes';

const initialState = {
    fullData: null,
    videoSource: [],
    videoSourceName: null,
    episodeSource: [],
    totalEpisodeNum: 0,
    author: null,
    type: null,
    recommendAndNegative: null,
    id: 0,
    globalType: null,
    guessLike: [],
    commentList: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_VIDEO_FULL_DATA:
            return {
                ...state,
                fullData: action.data,
                videoSource: action.source,
                author: action.author,
                type: action.videoType,
                recommendAndNegative: action.recommendAndNegative,
                id: action.data.id,
                globalType: action.data.global_type
            };
        case Types.REFRESH_VIDEO_RECOMMEND_NEGATIVE_DATA:
            return {
                ...state,
                recommendAndNegative: action.data
            };
        case Types.SET_EPISCODE_SOURCE:
            return {
                ...state,
                episodeSource: action.data,
                totalEpisodeNum: action.episodeTotalNum,
                videoSourceName: action.videoSourceName
            };
        case Types.SET_GUESS_LIKE_SOURCE:
            return {
                ...state,
                guessLike: action.data,
            };
        case Types.SET_COMMENT_LIST_DATA:
            return {
                ...state,
                commentList: action.data,
            };
        case Types.VIDEO_DETAIL_DATA_RESET:
            return {
                ...initialState
            };
        default: return state;
    }
};
export default reducer;