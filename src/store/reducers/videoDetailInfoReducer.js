import * as Types from '../actionTypes';
import _ from 'lodash';

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
    isCollect: false,
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
                globalType: action.data.global_type,
                isCollect: action.data.user_collect,
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
        case Types.VIDEO_DETAIL_ADD_MYSELF_COMMENT:
            {
                let oldList = state.commentList;
                let newList = _.concat([action.data], oldList);
                return {
                    ...state,
                    commentList: newList
                };
            }
        case Types.VIDEO_DETAIL_CHANGE_COLLECT_STATE:
            return {
                ...state,
                isCollect: action.newState
            };
        default: return state;
    }
};
export default reducer;