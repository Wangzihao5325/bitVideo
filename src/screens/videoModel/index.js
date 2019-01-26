import React, { PureComponent } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';

import Video from 'react-native-video';
import ModalHeader from '../loginModel/modalComponent/ModalHeader';
import VideoHeader from './videoComponent/videoHeader';

export default class VideoModel extends PureComponent {
    componentDidMount() {
        const videoId = this.props.navigation.getParam('videoId', 'undefine_Id');
        console.log('kkkkkkkkkkk');
        console.log(videoId);
        if (videoId !== 'undefine_Id') {
            Api.getVideoInfo(videoId, (result, code, message) => {
                if (result) {
                    console.log(result);
                    console.log('we have a result');
                }
                console.log(message);
                console.log('12345678');
            });
        }
    }
    goBack = () => {
        this.props.navigation.goBack();
    }

    onBuffer = () => {
        console.log('is on buffer');
    }
    videoError = () => {
        console.log('is on error');
    }

    render() {
        return (
            <SafeAreaView>
                <View style={{ flex: 1 }} />
                {/* <Video
                    source={{ uri: 'https://pp.605ziyuan.com/20180905/btValsHQ/index.m3u8' }}
                    ref={(ref) => { this.player = ref }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.bgVideo}
                /> */}
                <VideoHeader />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bgVideo: {
        height: 200,
        width: Sizes.DEVICE_WIDTH,
        backgroundColor: 'black'
    }
});