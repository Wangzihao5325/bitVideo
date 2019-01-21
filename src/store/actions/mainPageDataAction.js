import * as Types from '../actionTypes';

export function setMainPageData(data) {
    return { type: Types.SET_MAIN_PAGE_DATA, data: data };
}
