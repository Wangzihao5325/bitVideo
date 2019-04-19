import * as Types from '../actionTypes';

export function change_net_state(state) {
    return { type: Types.CHANGE_NET_STATE, nowState: state };
}
