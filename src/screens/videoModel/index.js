import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import store from '../../store/index';
import { set_video_full_data } from '../../store/actions/videoDetailInfoAction';
import Api from '../../socket/index';

import XSVideo from './videoComponent/video';
import VideoHeader from './videoComponent/videoHeader';
import UsualInfoTab from './videoComponent/usualInfoTab';
import CommentTab from './videoComponent/commentTab';
import SourceTab from './videoComponent/sourceTab';
import EpiscodeTab from './videoComponent/episcodeTab';

export default class VideoModel extends PureComponent {
    componentDidMount() {
        const videoId = this.props.navigation.getParam('videoId', 'undefine_Id');
        if (videoId !== 'undefine_Id') {
            Api.getVideoInfo(videoId, (result, code, message) => {
                if (result) {
                    console.log(result);
                    store.dispatch(set_video_full_data(result));
                } else {
                    console.log(message);
                }
            });
        }
    }
    goBack = () => {
        this.props.navigation.goBack();
    }


    //'https://pp.605ziyuan.com/20180905/btValsHQ/index.m3u8'
    render() {
        return (
            <SafeAreaView>
                <XSVideo />
                <VideoHeader />
                <UsualInfoTab />
                <CommentTab />
                <SourceTab />
                <EpiscodeTab />
            </SafeAreaView>
        );
    }
}