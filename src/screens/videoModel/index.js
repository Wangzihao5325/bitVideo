import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import store from '../../store/index';
import { set_video_full_data, set_guess_like_source } from '../../store/actions/videoDetailInfoAction';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';

import ModalHeader from '../loginModel/modalComponent/ModalHeader';
import XSVideo from './videoComponent/video';
import VideoHeader from './videoComponent/videoHeader';
import UsualInfoTab from './videoComponent/usualInfoTab';
import CommentTab from './videoComponent/commentTab';
import SourceTab from './videoComponent/sourceTab';
import EpiscodeTab from './videoComponent/episcodeTab';
import InputBottom from './videoComponent/inputBottom';
import GuessLike from './videoComponent/guessLike';

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
                    store.dispatch(set_guess_like_source(result.data));
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
            <SafeAreaView style={{ flex: 1 }}>
                <ModalHeader title='' goBack={this.goBack} />
                <XSVideo />
                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                >
                    <VideoHeader />
                    <UsualInfoTab />
                    <CommentTab />
                    <SourceTab />
                    <EpiscodeTab />
                    <GuessLike />
                </ScrollView>
                <InputBottom />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    scroll: {
        // height: Sizes.DEVICE_HEIGHT - 38 - 300 - 50,
        // width: Sizes.DEVICE_WIDTH
        flex: 1
    }
});