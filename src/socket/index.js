import * as Config from '../global/Config';
import Variables from '../global/Variables';

class api {
    getFetch(url, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL + url;
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
                    onSuccess(result, code, message);
                } catch (error) {
                    // console.log(error);
                    onError ? onError(result, code, message) : console.log(responseJson);
                }
            }
        )
    }

    postFetch(url, formData, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL + url;
        let header = { Accept: 'application/json', 'Content-Type': 'multipart/form-data' };
        if (Variables.account.token) {
            header = { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${Variables.account.token}` }
        }
        let obj = { method: 'POST', headers: header, body: formData };
        fetch(fullUrl, obj).then((response) => JSON.parse(response._bodyInit)).then(
            (reponseJson) => {
                const result = reponseJson.result ? reponseJson.result : null;
                const code = reponseJson.code ? reponseJson.code : null;
                const message = reponseJson.message ? reponseJson.message : null;
                if (message === 'success') {
                    try {
                        onSuccess(result, code, message);
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    onError ? onError(result, code, message) : console.log(responseJson);
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

    postRegisterByDeviceId(id, onSuccess, onError) {
        const url = '/api/register-device';
        let formData = new FormData();
        formData.append('device_code', id);
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

    getActerList(onSuccess, onError) {
        const url = '/api/video/special/actor/list';
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

    getSearchVideoByName(name, onSuccess, onError) {
        const url = `/api/video/lists?video_title=${name}`;
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
        formData.append('video_id[]', id);
        this.postFetch(url, formData, onSuccess, onError);
    }

    postCancelHistory(idArr, onSuccess, onError) {
        const url = '/api/video/user/history/cancel';
        let formData = new FormData();
        idArr.forEach((item) => {
            formData.append('video_id[]', item);
        });

        this.postFetch(url, formData, onSuccess, onError);
    }

    getViewModuleMore(id, page, limit, onSuccess, onError) {
        const url = `/api/video/index/viewmodulemore?id=${id}&page=${page}&limit=${limit}`;
        this.getFetch(url, onSuccess, onError);
    }

    getIconHistoryList(onSuccess, onError) {
        const url = `/api/user/coins/history/list`;
        this.getFetch(url, onSuccess, onError);
    }
}

export default new api();