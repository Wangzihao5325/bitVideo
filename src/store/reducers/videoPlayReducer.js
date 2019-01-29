import * as Types from '../actionTypes';

const initialState = {
    videoType: null,
    videoUrl: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_VIDEO_URL_AND_TYPE:
            return {
                ...state,
                videoType: action.videoType,
                videoUrl: action.videoUrl
            };
        default: return state;
    }
};
export default reducer;