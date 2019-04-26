import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform, StatusBar, Image, Text } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

class PalyerAd extends PureComponent {
    state = {
        isShow: true,
        time: 5,
        image: Math.random() > 0.5 ? require('../../image/usual/player_ad_1.png') : require('../../image/usual/player_ad_2.png')
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            let time = this.state.time - 1;
            if (time > 0) {
                this.setState({
                    time: time
                });
            } else {
                this.setState({
                    time: time,
                    isShow: false
                }, () => {
                    clearInterval(this.timer);
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        if (this.state.isShow) {
            return (
                <View style={{ height: 200, width: Sizes.DEVICE_WIDTH, zIndex: 20, position: 'absolute', top: 0, left: 0 }}>
                    <Image style={{ height: 200, width: Sizes.DEVICE_WIDTH }} source={this.state.image} />
                    <View style={{ position: 'absolute', top: 5, right: 5 }}><Text style={{ color: 'white' }}>{`${this.state.time}秒`}</Text></View>
                </View>
            )
        } else {
            return (null);
        }
    }
}

//'https://pp.605ziyuan.com/20180905/btValsHQ/index.m3u8'
export default class RootPlayer extends PureComponent {
    static defaultProps = {
        disableBack: false,
        navi: false,
        disableFullscreen: false
    }

    state = {
        isFullScreen: false,
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
                    {Platform.OS === 'android' && !this.state.isFullScreen && <StatusBar backgroundColor={Colors.SCREEN_BGCOLOR} />}
                    {Platform.OS === 'android' && this.state.isFullScreen && <StatusBar translucent={true} backgroundColor='transparent' />}
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
                            navigator={this.props.navi}
                            source={{ uri: this.props.videoUrl }}
                            ref={(ref) => { this.player = ref }}
                            onBuffer={this.onBuffer}
                            onError={this.videoError}
                            onEnterFullscreen={this._androidEnterFullScreen}
                            onExitFullscreen={this._androidExitFullScreen}
                            disableBack={this.props.disableBack}
                            disableFullscreen={this.props.disableFullscreen}
                        />
                    }
                    {this.props.addShow && <PalyerAd />}
                </View>
            );
        } else {
            return (
                <View style={styles.bgVideo} />
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