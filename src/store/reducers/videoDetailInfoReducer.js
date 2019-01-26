import * as Types from '../actionTypes';

const initialState = {
    fullData: null,
    videoSource: null,
    author: null,
    type: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_VIDEO_FULL_DATA:
            return {
                ...state,
                fullData: action.data,
                videoSource: action.source,
                author: action.author,
                type: action.videoType
            };
        default: return state;
    }
};
export default reducer;