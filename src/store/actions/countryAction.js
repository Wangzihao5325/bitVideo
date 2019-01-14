import * as Types from '../actionTypes';

export function countryCodeChange(countryCode) {
    return {
        type: Types.COUNTRY_CODE_CHANGE,
        countryCode: countryCode
    };
}
