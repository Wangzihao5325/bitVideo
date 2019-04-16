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

export {
    naviToVideoService
};