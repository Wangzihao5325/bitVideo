import { AsyncStorage } from 'react-native';
import * as Types from '../actionTypes';
import store from '../../store/index';

export async function store_dispath_search_history_add(searchText) {
    let strData = await AsyncStorage.getItem('SearchHistory');
    let dataArr = [];
    if (strData) {
        dataArr = JSON.parse(strData);
    }
    dataArr.unshift(searchText);
    if (dataArr.length > 9) {
        dataArr.length = 9;
    }
    AsyncStorage.setItem('SearchHistory', JSON.stringify(dataArr));
    store.dispatch({ type: Types.ADD_SEARCH_HISTORY, data: dataArr, isShow: true });
}

export async function store_dispath_search_history_get() {
    let strData = await AsyncStorage.getItem('SearchHistory');
    let dataArr = null;
    if (strData) {
        dataArr = JSON.parse(strData);
    }
    if (dataArr) {
        store.dispatch({ type: Types.GET_SEARCH_HISTORY, data: dataArr, isShow: true });
    } else {
        store.dispatch({ type: Types.GET_SEARCH_HISTORY, data: [], isShow: false });
    }
}

export function search_history_clear() {
    AsyncStorage.removeItem('SearchHistory');
    return { type: Types.CLEAR_SEARCH_HISTORY, data: [], isShow: false };
}

export function get_search_result_data(data, nowPage, lastPage, title) {
    return { type: Types.GET_SEARCH_RESULT_DATA, result: data, isResult: true, nowPage: nowPage, lastPage: lastPage, title: title };
}

export function append_search_result_data(data, nowPage, lastPage) {
    return { type: Types.APPEND_SEARCH_RESULT_DATA, result: data, nowPage: nowPage, lastPage: lastPage };
}

export function reset_search_result_data() {
    return { type: Types.RESET_SEARCH_RESULT_DATA };
}