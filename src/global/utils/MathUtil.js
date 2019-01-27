import * as In18 from '../In18';

const playCountTransform = function (num) {
    if (num < 10000) {
        return `${num}`;
    } else {
        let result = (num / 10000).toFixed(2);
        return `${result}${In18.TEN_THOUSAND}`
    }
}

export {
    playCountTransform
};