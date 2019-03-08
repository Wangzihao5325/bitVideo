import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as Sizes from '../../global/Sizes';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

//'https://pp.605ziyuan.com/20180905/btValsHQ/index.m3u8'
export default class ShortVideoPlayer extends PureComponent {
    state = {
        isFullScreen: false
    }

    onBuffer = () => {
        console.log('is on buffer');
    }

    videoError = () => {
        console.log('is on error');
    }

    _androidEnterFullScreen = () => {
        Orientation.lockToLandscape();
        this.setState({ isFullScreen: true });
    }

    _androidExitFullScreen = () => {
        Orientation.lockToPortrait();
        this.setState({ isFullScreen: false });
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }

    render() {
        if (this.props.videoUrl) {
            return (
                <View style={this.state.isFullScreen ? styles.fullScreenFlexView : styles.flexView}>
                    {
                        Platform.OS === 'ios' &&
                        <Video
                            source={{ uri: this.props.videoUrl }}
                            ref={(ref) => { this.player = ref }}
                            onBuffer={this.onBuffer}
                            onError={this.videoError}
                            style={styles.bgVideo}
                            controls={true}
                        />
                    }
                    {
                        Platform.OS === 'android' &&
                        <VideoPlayer
                            source={{ uri: this.props.videoUrl }}
                            ref={(ref) => { this.player = ref }}
                            onBuffer={this.onBuffer}
                            onError={this.videoError}
                            onEnterFullscreen={this._androidEnterFullScreen}
                            onExitFullscreen={this._androidExitFullScreen}
                            disableBack={true}
                        />
                    }
                </View>
            );
        } else {
            return (
                <View style={styles.bgVideoTest} />
            );
        }
    }
}

const styles = StyleSheet.create({
    bgVideo: {
        height: 200,
        width: Sizes.DEVICE_WIDTH,
        backgroundColor: 'black'
    },
    flexView: {
        height: 200,
        width: Sizes.DEVICE_WIDTH,
    },
    fullScreenFlexView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
        zIndex: 10
    },
    fullScreenBgVideo: {
        flex: 1
    }
});