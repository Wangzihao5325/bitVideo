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
    guessLike: []
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
                id: action.data.id
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
        default: return state;
    }
};
export default reducer;