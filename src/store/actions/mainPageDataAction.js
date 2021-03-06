import * as Types from '../actionTypes';

export function setMainPageData(data) {
    return { type: Types.SET_MAIN_PAGE_DATA, data: data };
}

export function addMainPageData(data) {
    return { type: Types.ADD_MAIN_PAGE_DATA, data: data };
}

export function setGlobalTypeData(data) {
    return { type: Types.SET_GLOBAL_TYPE_DATA, typeArr: data };
}

export function setNowGlobalType(type) {
    return { type: Types.SET_NOW_GLOBAL_TYPE, nowType: type };
}

export function setPageInfo(nowPage, totalPage) {
    return { type: Types.SET_MAIN_CONTENT_PAGE_INFO, nowPage: nowPage, totalPage: totalPage };
}