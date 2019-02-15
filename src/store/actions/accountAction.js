import * as Types from '../actionTypes';

export function get_device_account_info(e) {
    let regObj = {};
    regObj.name = e.name;
    regObj.id = e.id;
    regObj.sex = e.sex;
    regObj.status = e.status;
    regObj.type = e.type;
    regObj.mobile = e.mobile;
    regObj.inviteCode = e.invite_code;
    regObj.coverPath = e.cover_path;
    regObj.collectCount = e.collect_count;
    regObj.historyCount = e.history_count;
    return { type: Types.GET_DEVICE_ACCOUNT_INFO, obj: regObj };
}

export function get_user_info(e) {
    let regObj = {};
    regObj.viewCountDailyTotal = e.view_count_daily_total;
    regObj.viewCountDailyUse = e.view_count_daily_use;
    regObj.icons = e.coins;
    return { type: Types.GET_USER_INFO, obj: regObj };
}