import * as Config from '../global/Config';
import Variables from '../global/Variables';

class api {
    getFetch(url, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL + url;
        let header = { Accept: 'application/json' };
        if (Variables.account.token) {
            header = { Accept: 'application/json', Authorization: Variables.account.token }
        }
        let obj = { method: 'GET', headers: header }
        fetch(fullUrl, obj).then((response) => response.json()).then(
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

    postFetch(url, formData, onSuccess, onError) {
        let fullUrl = Config.SERVICE_URL + url;
        let header = { Accept: 'application/json', 'Content-Type': 'multipart/form-data' };
        if (Variables.account.token) {
            header = { Accept: 'application/json', 'Content-Type': 'multipart/form-data', Authorization: Variables.account.token }
        }
        let obj = { method: 'POST', headers: header, body: formData };
        fetch(fullUrl, obj).then((reponse) => reponse.json()).then(
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
}

export default new api();