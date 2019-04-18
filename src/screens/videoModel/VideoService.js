import { AsyncStorage } from 'react-native';
import NavigationService from '../../app/NavigationService';
import store from '../../store/index';
import {
    set_video_full_data,
    set_guess_like_source,
    set_comment_list_data
} from '../../store/actions/videoDetailInfoAction';
import Api from '../../socket/index';

import ToastRoot from '../../components/toast/index';

const naviToVideoService = function (videoId, videoType) {
    if (videoType == 'ad') {
        Api.postTaskAndExchange('CLICK_AD', (e, code, message) => {
            //do nothing
        })
    }
    if (videoId) {
        //获取video信息
        Api.getVideoInfo(videoId, (result, code, message) => {
            if (result) {
                store.dispatch(set_video_full_data(result));
                //根据video id 获取猜你喜欢信息
                Api.getGuessLike(videoId, (innerResultOne, code, message) => {
                    if (innerResultOne) {
                        store.dispatch(set_guess_like_source(innerResultOne.data));
                    }
                });
                //根据video id 获取评论
                Api.getCommentList(videoId, (innerResultTwo, code, message) => {
                    if (innerResultTwo) {
                        store.dispatch(set_comment_list_data(innerResultTwo.data));
                    }
                });

                NavigationService.navigate('VideoModel');
            } else {
                NavigationService.navigate('ToastModel', { type: 'NoTimes' });
                //this.props.navigation.goBack();
            }
        });
    }
}

const halfHourDetect = function () {
    (async function () {
        let times = await AsyncStorage.getItem('User_See_Times');
        let nowTime = new Date();
        if (!times) {
            AsyncStorage.setItem('User_See_Times', nowTime.getTime().toString());
            AsyncStorage.setItem('Today_Is_Done', 'false');
            AsyncStorage.setItem('Left_Times', '1800000');
            return;
        }
        let todayIsDone = await AsyncStorage.getItem('Today_Is_Done');
        let leftTimes = await AsyncStorage.getItem('Left_Times');
        let storgeTimes = new Date(parseInt(times));
        if (storgeTimes.getDate == nowTime.getDate) {
            if (todayIsDone == 'true') {
                return;
            } else {
                if (nowTime.getTime() - storgeTimes.getTime() > parseInt(leftTimes)) {
                    //完成任务
                    Api.postTaskAndExchange('LOOKED_VIDEO_SATISFY', (e, code, message) => {
                        // do nothing
                    });
                    AsyncStorage.setItem('Today_Is_Done', 'true');
                } else {
                    AsyncStorage.setItem('User_See_Times', '');
                    AsyncStorage.setItem('Left_Times', (parseInt(leftTimes) - (nowTime.getTime() - storgeTimes.getTime())).toString());
                }
            }
        } else {
            //新的一天
            AsyncStorage.setItem('User_See_Times', nowTime.getTime());
            AsyncStorage.setItem('Today_Is_Done', 'false');
            AsyncStorage.setItem('Left_Times', '1800000');
            return;
        }
    })();
}

export {
    naviToVideoService,
    halfHourDetect
};