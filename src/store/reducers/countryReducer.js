import * as Types from '../actionTypes';

const initialState = {
    countryCode: '+86'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.COUNTRY_CODE_CHANGE:
            return {
                ...state,
                countryCode: action.countryCode
            };
        default: return state;
    }
};
export default reducer;