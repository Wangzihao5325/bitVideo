import * as Config from '../global/Config';
import Variables from '../global/Variables';
import NavigationService from '../app/NavigationService';
let CryptoJS = require('crypto-js');

const SECURTY_URL = '/api/accept';
const isSecurty = false;
const keyStr = 'E8yC1EncqQZrfWQg';
var KEY = CryptoJS.enc.Utf8.parse(keyStr);

const headerGenerator = (isPost) => {
    let header = { Accept: 'application/json' };
    if (isPost) {
        header = { Accept: 'application/json' };
    }
    if (Variables.account.token) {
        header['Authorization'] = `Bearer ${Variables.account.token}`;
    }
    if (Variables.account.deviceId) {
        header['device-id'] = Variables.account.deviceId;
    }
    if (Variables.account.platform) {
        header['platform'] = Variables.account.platform;
    }
    if (Variables.account.versionName) {
        header['version-name'] = Variables.account.versionName;
    }
    if (Variables.account.versionCode) {
        header['version-code'] = Variables.account.versionCode;
    }
    return header;
}

const formdataToObj = (formdata) => {
    var objData = {};
    formdata._parts.forEach((value) => objData[value[0]] = value[1]);
    return objData;
}

class api {
    getFetch(url, onSuccess, onError) {
        if (isSecurty) {
            //加密处理
            this.getWithSecurty(url, onSuccess, onError);
        } else {
            //不加密处理
            this.getWithUnsecurty(url, onSuccess, onError);
        }
    }

    getWithSecurty(url, onSuccess, onError) {
        //解析url拆分参数
        let params = {};
        let index = url.indexOf('?');
        if (index >= 0) {
            let arr = url.split('?');
            let paramArr = arr[1].split('&');
            paramArr.forEach((item) => {
                let keyValue = item.split('=');
                params[keyValue[0]] = keyValue[1];
            });
        }

        let paramsRegObj = {
            uri: url.split('?')[0],
            method: 'GET',
            headers: headerGenerator(false),
            params: params
        }
        let paramsStr = JSON.stringify(paramsRegObj);

        //加密
        let encryptedData = CryptoJS.AES.encrypt(paramsStr, KEY, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        let securtyReg = encodeURI(encryptedData.toString());
        //normal post
        let formData = new FormData();
        formData.append('data', securtyReg);
        this.postWithUnsecurty(SECURTY_URL, formData, (result, code, message) => {
            //解密
            let resultDecipher = null;
            if (result) {
                let decodeUrl = decodeURIComponent(result);
                let bytes = CryptoJS.AES.decrypt(decodeUrl, KEY, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
                resultDecipher = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));
            }
            if (onSuccess) {
                onSuccess(resultDecipher, code, message);
            }
        }, onError);
    }

    getWithUnsecurty(url, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL.domainUrl + url;
        let header = { Accept: 'application/json' };
        if (Variables.account.token) {
            header = { Accept: 'application/json', Authorization: `Bearer ${Variables.account.token}` }
        }
        let obj = { method: 'GET', headers: header }
        fetch(fullUrl, obj).then((response) => JSON.parse(response._bodyInit)).then(
            (reponseJson) => {
                const result = reponseJson.result ? reponseJson.result : null;
                const code = reponseJson.code ? reponseJson.code : null;
                const message = reponseJson.message ? reponseJson.message : null;
                try {
                    if (code === 401) {
                        NavigationService.navigate('ToastModel', { type: 'AccountUseByOther' });
                    } else {
                        onSuccess(result, code, message);
                    }
                } catch (error) {
                    onError ? onError(result, code, message) : console.log(`error: get socket error! ${fullUrl}`);
                }
            }
        )
    }

    getWithFirstUrl(url, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL.FirstUrl + url;
        let header = { Accept: 'application/json' };
        if (Variables.account.token) {
            header = { Accept: 'application/json', Authorization: `Bearer ${Variables.account.token}` }
        }
        let obj = { method: 'GET', headers: header }
        fetch(fullUrl, obj).then((response) => JSON.parse(response._bodyInit)).then(
            (reponseJson) => {
                let resultDecipher = '';
                if (reponseJson.result) {
                    let decodeUrl = decodeURIComponent(reponseJson.result);
                    let bytes = CryptoJS.AES.decrypt(decodeUrl, KEY, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
                    resultDecipher = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));
                }
                const result = resultDecipher;
                const code = reponseJson.code ? reponseJson.code : null;
                const message = reponseJson.message ? reponseJson.message : null;
                try {
                    onSuccess(result, code, message);
                } catch (error) {
                    onError ? onError(result, code, message) : console.log(e);
                }
            }
        )
    }

    postFetch(url, formData, onSuccess, onError) {
        if (isSecurty) {
            //加密处理
            this.postWithSecurty(url, formData, onSuccess, onError);
        } else {
            //不加密处理
            this.postWithUnsecurty(url, formData, onSuccess, onError);
        }
    }

    postWithSecurty(unsecurtyURL, unsecurtyFormdata, onSuccess, onError) {
        //数据加密
        let paramsRegObj = {
            uri: unsecurtyURL,
            method: 'POST',
            headers: headerGenerator(true),
            params: formdataToObj(unsecurtyFormdata),
        }
        let paramsStr = JSON.stringify(paramsRegObj);

        let encryptedData = CryptoJS.AES.encrypt(paramsStr, KEY, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });

        let securtyReg = encodeURI(encryptedData.toString());
        //normal post
        let formData = new FormData();
        formData.append('data', securtyReg);
        this.postWithUnsecurty(SECURTY_URL, formData, (result, code, message) => {
            //解密
            let resultDecipher = null;
            if (result) {
                let decodeUrl = decodeURIComponent(result);
                let bytes = CryptoJS.AES.decrypt(decodeUrl, KEY, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7, iv: '', });
                resultDecipher = JSON.parse(CryptoJS.enc.Utf8.stringify(bytes));
            }
            if (onSuccess) {
                onSuccess(resultDecipher, code, message);
            }
        }, onError);
    }

    postWithUnsecurty(url, formData, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL.domainUrl + url;
        let header = { Accept: 'application/json', 'Content-Type': 'multipart/form-data' };
        if (Variables.account.token) {
            header = { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${Variables.account.token}` }
        }
        let obj = { method: 'POST', headers: header, body: formData };

        fetch(fullUrl, obj).then((response) => JSON.parse(response._bodyInit))
            .then(
                (reponseJson) => {
                    const result = reponseJson.result ? reponseJson.result : null;
                    const code = reponseJson.code ? reponseJson.code : null;
                    const message = reponseJson.message ? reponseJson.message : null;
                    try {
                        if (code === 401) {
                            NavigationService.navigate('ToastModel', { type: 'AccountUseByOther' });
                        } else {
                            onSuccess(result, code, message);
                        }
                    } catch (error) {
                        onError ? onError(result, code, message) : console.log(`error: socket error! ${error}`);
                    }
                }
            )
    }

    getGlobalType(onSuccess, onError) {
        const url = '/api/video/globaltype';
        this.getFetch(url, onSuccess, onError);
    }

    getTaskList(onSuccess, onError) {
        const url = '/api/user/task/list';
        this.getFetch(url, onSuccess, onError);
    }

    postMessageCode(mobile, onSuccess, onError) {
        const url = '/api/mobile/verify-code';
        let formData = new FormData();
        formData.append('mobile', mobile);
        this.postFetch(url, formData, onSuccess, onError);
    }

    postRegisterByDeviceId(id, invite, platformWords, onSuccess, onError) {
        const url = '/api/register-device';
        let formData = new FormData();
        formData.append('device_code', id);
        formData.append('platform', platformWords);
        if (invite) {
            formData.append('invite_code', invite);
        }
        this.postFetch(url, formData, onSuccess, onError);
    }

    postRegister(mobile, verKey, code, devCode, password, inviteCode, onSuccess, onError) {
        const url = '/api/register';
        let formData = new FormData();
        formData.append('mobile', mobile);
        formData.append('verification_key', verKey);
        formData.append('code', code);
        formData.append('device_code', devCode);
        formData.append('password', password);
        formData.append('password_confirmation', password);
        if (inviteCode) {
            formData.append('invite_code', inviteCode);
        }
        this.postFetch(url, formData, onSuccess, onError);
    }

    postLogin(mobile, type, password, verCode, onSuccess, onError) {
        const url = '/api/login';
        let formData = new FormData();
        formData.append('mobile', mobile);
        formData.append('type', type);
        if (type === 'P') {
            formData.append('password', password);
        } else {
            formData.append('code', password);
            formData.append('verification_key', verCode);
        }
        this.postFetch(url, formData, onSuccess, onError);
    }

    postResetPassword(mobile, password, verCode, code, onSuccess, onError) {
        const url = '/api/user/reset-pwd';
        let formData = new FormData();
        formData.append('mobile', mobile);
        formData.append('password', password);
        formData.append('password_confirmation', password);
        formData.append('verification_key', verCode);
        formData.append('code', code);
        this.postFetch(url, formData, onSuccess, onError);
    }

    getActerList(action, page, limit, onSuccess, onError) {
        const url = `/api/video/special/actor/list?action=${action}&page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getVideoTypeList(onSuccess, onError) {
        const url = '/api/video/special/type/list';
        this.getFetch(url, onSuccess, onError);
    }

    getTopRecommendVideo(onSuccess, onError) {
        const url = '/api/video/lists';
        this.getFetch(url, onSuccess, onError);
    }

    postGlobalTypeVideo(type, page, onSuccess, onError) {
        let url = `/api/video/index/viewmodule?global_type=${type}`;
        if (page) {
            url = `/api/video/index/viewmodule?global_type=${type}&page=${page}`;
        }
        this.getFetch(url, onSuccess, onError);
    }

    postGlobalTypeVideo111(type, page, onSuccess, onError) {
        let url = `/api/video/index/viewmodule?global_type=${type}`;
        if (page) {
            url = `/api/video/index/viewmodule?global_type=${type}&page=${page}`;
        }
        this.getFetch(url, onSuccess, onError);
    }

    getVideoInfo(id, onSuccess, onError) {
        const url = `/api/video/info?video_id=${id}`;
        this.getFetch(url, onSuccess, onError);
    }

    getVideoInfoWithChannel(id, channel, onSuccess, onError) {
        const url = `/api/video/info?video_id=${id}&channel=${channel}`;
        this.getFetch(url, onSuccess, onError);
    }

    postRecommendOrNegative(id, action, status, onSuccess, onError) {
        const url = '/api/video/user/appraise/add';
        let formData = new FormData();
        formData.append('video_id', id);
        formData.append('action', action);
        formData.append('status', status);
        this.postFetch(url, formData, onSuccess, onError);
    }

    getGuessLike(videoId, onSuccess, onError) {
        const url = `/api/video/guess/like?video_id=${videoId}`;
        this.getFetch(url, onSuccess, onError);
    }

    getCommentList(videoId, onSuccess, onError) {
        const url = `/api/video/comment/lists?video_id=${videoId}`;
        this.getFetch(url, onSuccess, onError);
    }

    postAddComment(videoId, type, content, onSuccess, onError) {
        const url = '/api/video/user/comment/add';
        let formData = new FormData();
        formData.append('video_id', videoId);
        formData.append('global_type', type);
        formData.append('content', content);
        this.postFetch(url, formData, onSuccess, onError);
    }

    getSearchRecommendVideo(onSuccess, onError) {
        const url = '/api/video/lists?exponent_bd=desc';
        this.getFetch(url, onSuccess, onError);
    }

    getSearchVideoByName(name, page, limit, onSuccess, onError) {
        const url = `/api/video/lists?video_title=${name}&page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getUserInfo(onSuccess, onError) {
        const url = '/api/user/userinfo';
        this.getFetch(url, onSuccess, onError);
    }

    getUserWatchHistory(onSuccess, onError) {
        const url = '/api/video/user/history/list';
        this.getFetch(url, onSuccess, onError);
    }

    postFeedback(title, contact, onSuccess, onError) {
        const url = '/api/feedback';
        let formData = new FormData();
        formData.append('title', title);
        formData.append('contact', contact);
        this.postFetch(url, formData, onSuccess, onError);
    }

    postAddCollect(type, id, onSuccess, onError) {
        const url = '/api/video/user/collect/add';
        let formData = new FormData();
        formData.append('global_type', type);
        formData.append('video_id', id);
        this.postFetch(url, formData, onSuccess, onError);
    }

    postCancelCollect(id, onSuccess, onError) {
        const url = '/api/video/user/collect/cancel';
        let formData = new FormData();
        if (isSecurty) {
            formData.append('video_id', [id]);
        } else {
            formData.append('video_id[]', id);
        }
        this.postFetch(url, formData, onSuccess, onError);
    }

    postCancelCollectArr(idArr, onSuccess, onError) {
        const url = '/api/video/user/collect/cancel';
        let formData = new FormData();
        if (isSecurty) {
            formData.append('video_id', idArr);
        } else {
            idArr.forEach((item) => {
                formData.append('video_id[]', item);
            });
        }
        this.postFetch(url, formData, onSuccess, onError);
    }

    postCancelHistory(idArr, onSuccess, onError) {
        const url = '/api/video/user/history/cancel';
        let formData = new FormData();
        if (isSecurty) {
            formData.append('video_id', idArr);
        } else {
            idArr.forEach((item) => {
                formData.append('video_id[]', item);
            });
        }

        this.postFetch(url, formData, onSuccess, onError);
    }

    getViewModuleMore(id, page, limit, onSuccess, onError) {
        const url = `/api/video/index/viewmodulemore?id=${id}&page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getIconHistoryList(type, onSuccess, onError) {
        const url = `/api/user/coins/history/list?action=${type}`;
        this.getFetch(url, onSuccess, onError);
    }

    getUserCollectList(onSuccess, onError) {
        const url = `/api/video/user/collect/list`;
        this.getFetch(url, onSuccess, onError);
    }

    getDailySignIn(onSuccess, onError) {
        const url = '/api/user/task/dailysignin';
        this.getFetch(url, onSuccess, onError);
    }

    getSplashScreen(onSuccess, onError) {
        const url = '/api/video/startup';
        this.getFetch(url, onSuccess, onError);
    }

    getShortVideoType(onSuccess, onError) {
        const url = '/api/video/short/type';
        this.getFetch(url, onSuccess, onError);
    }

    getShortVideoListById(limit, page, onSuccess, onError) {
        const url = `/api/video/short/list?limit=${limit}&page=${page}`;
        this.getFetch(url, onSuccess, onError);
    }

    getShortVideoGuessLike(id, onSuccess, onError) {
        const url = `/api/video/short/guesslike?video_id=${id}`;
        this.getFetch(url, onSuccess, onError);
    }

    getNewSubjectList(page, limit, onSuccess, onError) {
        const url = `/api/video/special/list?page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getNewSubjectDetail(id, page, limit, onSuccess, onError) {
        const url = `/api/video/special/info?special_id=${id}&page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getTypeArrsByGlobalType(type, onSuccess, onError) {
        const url = `/api/video/dict?global_type=${type}`;
        this.getFetch(url, onSuccess, onError);
    }

    getVIPCardList(onSuccess, onError) {
        const url = '/api/vip_card';
        this.getFetch(url, onSuccess, onError);
    }

    getUserOrderList(onSuccess, onError) {
        const url = '/api/user/order/list';
        this.getFetch(url, onSuccess, onError);
    }

    getUserExchangeList(onSuccess, onError) {
        const url = '/api/user/convert/list';
        this.getFetch(url, onSuccess, onError);
    }

    getInviteList(page, limit, onSuccess, onError) {
        const url = `/api/video/user/invitation/list?page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getUseMsgList(type, onSuccess, onError) {
        const url = `/api/user/msg/list?type=${type}`;
        this.getFetch(url, onSuccess, onError);
    }

    postBindPhone(mobile, verKey, code, onSuccess, onError) {
        const url = '/api/user/bind_mobile';
        let formData = new FormData();
        formData.append('mobile', mobile);
        formData.append('verification_key', verKey);
        formData.append('code', code);

        this.postFetch(url, formData, onSuccess, onError);
    }

    getActorDetails(id, page, limit, onSuccess, onError) {
        const url = `/api/video/actor/video?actor_id=${id}&page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getSubjectAd(page, limit, onSuccess, onError) {
        const url = `/api/video/ad?page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    postAddOrder(mobile, onSuccess, onError) {
        const url = '/api/user/order/add';
        let formData = new FormData();
        formData.append('mobile', mobile);

        this.postFetch(url, formData, onSuccess, onError);
    }

    postTaskAndExchange(param, onSuccess, onError) {
        const url = '/api/user/equity/exchange';
        let formData = new FormData();
        formData.append('event', param);

        this.postFetch(url, formData, onSuccess, onError);
    }

    postTaskCoins(key, onSuccess, onError) {
        const url = '/api/user/get-coins';
        let formData = new FormData();
        formData.append('key', key);

        this.postFetch(url, formData, onSuccess, onError);
    }

    postShareQrCodeMessage(inviteCode, channel, from, onSuccess, onError) {
        const url = '/api/user/task/share';
        let formData = new FormData();
        formData.append('code', inviteCode);
        formData.append('channel', channel);
        formData.append('from', from);

        this.postFetch(url, formData, onSuccess, onError);
    }

    getUserUnreadMsg(onSuccess, onError) {
        const url = '/api/user/unread/msg';
        this.getFetch(url, onSuccess, onError);
    }

    getVideoTypeList(onSuccess, onError) {
        let url = `/api/video/type`;
        this.getFetch(url, onSuccess, onError);
    }

    getVideoTypeTrueList(globalType, innerType, sort, page, limit, onSuccess, onError) {
        let url = `/api/video/list/type?`;
        if (globalType) {
            url = url + `global_type=${globalType}`;
        }
        if (innerType) {
            url = url + `&type_id=${innerType}`;
        }
        if (sort) {
            url = url + `&sort=${sort}`;
        }
        if (page) {
            url = url + `&page=${page}`;
        }
        if (limit) {
            url = url + `&limit=${limit}`;
        }
        this.getFetch(url, onSuccess, onError);
    }

    getPayList(onSuccess, onError) {
        let url = '/api/pay-list';
        this.getFetch(url, onSuccess, onError);
    }

    postAddOrder(payType, vcId, deviceType, deviceCode, onSuccess, onError) {
        const url = '/api/user/order/add';
        let formData = new FormData();
        formData.append('pay_type', payType);
        formData.append('vc_id', vcId);
        formData.append('device_type', deviceType);
        formData.append('device_code', deviceCode);

        this.postFetch(url, formData, onSuccess, onError);
    }

    getDomain(onSuccess, onError) {
        const url = '/api/domain';
        this.getWithFirstUrl(url, onSuccess, onError);
    }

    getVersionMessage(platform, onSuccess, onError) {
        const url = `/api/version?platform=${platform}`;
        this.getFetch(url, onSuccess, onError);
    }

    getVideoIsAccess(id, onSuccess, onError) {
        const url = `/api/view-auth?video_id=${id}`;
        this.getFetch(url, onSuccess, onError);
    }

    getVideoChannel(onSuccess, onError) {
        const url = '/api/video/channel';
        this.getFetch(url, onSuccess, onError);
    }

    findAccountByPhone(mobile, verCode, code, onSuccess, onError) {
        const url = `/api/user/account/recallByMobile?mobile=${mobile}&verification_key=${verCode}&code=${code}`;
        this.getFetch(url, onSuccess, onError);
    }

    findAccountByUserMessage(order_no, username, register_at, remark, onSuccess, onError) {
        const url = '/api/user/find-msg';
        let formData = new FormData();
        if (order_no) {
            formData.append('order_no', order_no);
        }
        if (username) {
            formData.append('username', username);
        }
        if (register_at) {
            formData.append('register_at', register_at);
        }
        formData.append('remark', remark);
        this.postFetch(url, formData, onSuccess, onError);
    }

    bindInviteCode(code, onSuccess, onError) {
        const url = '/api/user/invitation/bind-code';
        let formData = new FormData();
        formData.append('code', code);
        this.postFetch(url, formData, onSuccess, onError);
    }

    findAccountByIdCard(token, device_code, onSuccess, onError) {
        const url = '/api/user/account/recallByCard';
        let formData = new FormData();
        formData.append('token', token);
        formData.append('device_code', device_code);
        this.postFetch(url, formData, onSuccess, onError);
    }
}

export default new api();