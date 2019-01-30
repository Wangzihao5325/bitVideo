import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import store from '../../store/index';
import { set_video_full_data } from '../../store/actions/videoDetailInfoAction';
import Api from '../../socket/index';

import ModalHeader from '../loginModel/modalComponent/ModalHeader';
import XSVideo from './videoComponent/video';
import VideoHeader from './videoComponent/videoHeader';
import UsualInfoTab from './videoComponent/usualInfoTab';
import CommentTab from './videoComponent/commentTab';
import SourceTab from './videoComponent/sourceTab';
import EpiscodeTab from './videoComponent/episcodeTab';
import InputBottom from './videoComponent/inputBottom';

export default class VideoModel extends PureComponent {

    componentDidMount() {
        const videoId = this.props.navigation.getParam('videoId', 'undefine_Id');
        if (videoId !== 'undefine_Id') {
            //获取video信息
            Api.getVideoInfo(videoId, (result, code, message) => {
                if (result) {
                    console.log('____this is video data_____!');
                    console.log(result);
                    store.dispatch(set_video_full_data(result));
                } else {
                    console.log(message);
                }
            });
            //根据video id 获取猜你喜欢信息
            Api.getGuessLike(videoId, (result, code, message) => {
                if (result) {
                    console.log('____this is guess like data_____!');
                    console.log(result);
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
                <ModalHeader title='' goBack={this.goBack} />
                <XSVideo />
                <ScrollView>
                    <VideoHeader />
                    <UsualInfoTab />
                    <CommentTab />
                    <SourceTab />
                    <EpiscodeTab />
                </ScrollView>
                <InputBottom />
            </SafeAreaView>
        );
    }
}