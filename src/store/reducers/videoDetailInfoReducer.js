import * as Types from '../actionTypes';

const initialState = {
    fullData: null,
    videoSource: [],
    author: null,
    type: null,
    recommendAndNegative: null,
    id: 0,
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
        default: return state;
    }
};
export default reducer;