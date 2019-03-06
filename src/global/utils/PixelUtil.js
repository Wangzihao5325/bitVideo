import { Platform, PixelRatio } from 'react-native';
import * as Sizes from '../Sizes';
/**
 * 以iOS平台为准，即输入是iOS平台的dp(iOS平台在加载webview内嵌iframe时是以px为单位进行显示,Android以dp进行显示)
 * 在保持iOS与Android webview大小相同的情况下返回双端的size
 * @param {number} dpNum 
 */
const webviewSizeUnifyFromDPToPX = function (dpNum) {
    let result = dpNum;
    if (Platform.OS === 'ios') {
        result = PixelRatio.getPixelSizeForLayoutSize(dpNum);
    }
    return result;
}

/**
 * 以iOS平台为准，即输入是iOS平台的px(iOS平台在加载webview内嵌iframe时是以px为单位进行显示,Android以dp进行显示)
 * 在保持iOS与Android webview大小相同的情况下返回双端的size
 * @param {number} pxNum 
 */
const webviewSizeUnifyInFromPXToDP = function (pxNum) {
    let result = pxNum;
    if (Platform.OS === 'android') {
        let pixelRate = PixelRatio.get();
        result = result / pixelRate;
    }
    return result;
}

const isXDevice = function () {
    if (Platform.OS === 'ios') {
        if (Sizes.DEVICE_WIDTH == 375 && Sizes.DEVICE_HEIGHT == 812) {
            return true;
        } else if (Sizes.DEVICE_WIDTH == 414 && Sizes.DEVICE_HEIGHT == 896) {
            return true;
        }
        return false
    }
    return false
}

export {
    webviewSizeUnifyFromDPToPX,
    webviewSizeUnifyInFromPXToDP,
    isXDevice,
};