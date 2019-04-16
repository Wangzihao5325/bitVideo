import * as Types from '../actionTypes';

const initialState = {
    isLogin: true,//false
    name: '',
    id: 0,
    sex: 1,
    status: 1,
    type: 10,
    mobile: '',
    inviteCode: '',
    coverPath: null,
    collectCount: 0,
    historyCount: 0,
    viewCountDailyTotal: 0,
    viewCountDailyUse: 0,
    icons: 0,
    vip: null,
    vipEndDay: '',
    vipHasDays: 0,
    remainCount: '',
    avaterIndex: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_DEVICE_ACCOUNT_INFO:
            return {
                ...state,
                ...action.obj
            };
        case Types.GET_USER_INFO:
            return {
                ...state,
                ...action.obj
            };
        default: return state;
    }
};
export default reducer;