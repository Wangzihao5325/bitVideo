import * as Types from '../actionTypes';

export function set_lock(isLock) {
    return { type: Types.SET_LOCK, isLock: isLock };
}