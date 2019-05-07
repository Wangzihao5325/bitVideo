import React, { PureComponent } from 'react';
import {
    View,
    Text,
    Platform,
    StatusBar,
    StyleSheet,
    Dimensions,
    BackHandler,
    ActivityIndicator,
    TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import Video from 'react-native-video';
import {
    TapGestureHandler,
    TouchableHighlight as GuestureTouchable
} from 'react-native-gesture-handler';
import Icons from 'react-native-vector-icons/MaterialIcons'
import Slider from 'react-native-slider';
import _ from 'lodash';
import Orientation from 'react-native-orientation';
import * as Sizes from '../../global/Sizes';

const delayTimes = 5000;
const doubleTap = React.createRef();
const { width, height } = Dimensions.get('window');

class HeaderController extends PureComponent {

    static contextTypes = {
        fullScreenCallback: PropTypes.func,
    }

    render() {
        let { fullScreenCallback } = this.context;
        return (
            <View style={[styles.headerControl, this.props.widthStyle]}>
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', paddingHorizontal: 10 }}>
                    {Platform.OS === 'ios' &&
                        <TouchableHighlight
                            style={{ height: 34, width: 34, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={() => fullScreenCallback()}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                                color='white'
                                size={34}
                            />
                        </TouchableHighlight>
                    }
                    {Platform.OS === 'android' &&
                        <GuestureTouchable
                            style={{ height: 34, width: 34, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={() => fullScreenCallback()}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                                color='white'
                                size={34}
                            />
                        </GuestureTouchable>
                    }
                </View>
            </View>
        );
    }
}

class CenterController extends PureComponent {

    static contextTypes = {
        playPausedCallback: PropTypes.func
    }

    render() {
        let superWidth = this.props.widthStyle.width;
        let superHeight = this.props.heightStyle.height;
        let absLeft = superWidth / 2 - styles.centerControl.width / 2;
        let absTop = superHeight / 2 - styles.centerControl.height / 2;
        if (this.props.isController) {
            return (
                <View style={[styles.centerControl, { position: 'absolute', top: absTop, left: absLeft, zIndex: 10 }]}>
                    {Platform.OS === 'ios' &&
                        <TouchableHighlight
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={this._playPausedBtnPress}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
                                color='white'
                                size={styles.centerControl.width - 10}
                            />
                        </TouchableHighlight>
                    }
                    {Platform.OS === 'android' &&
                        <GuestureTouchable
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={this._playPausedBtnPress}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
                                color='white'
                                size={styles.centerControl.width - 10}
                            />
                        </GuestureTouchable>
                    }
                </View>
            );
        } else {
            return (
                <View style={[styles.centerControl, { position: 'absolute', top: absTop, left: absLeft, zIndex: 10 }]}>
                    <ActivityIndicator />
                </View>
            );
        }
    }



    _playPausedBtnPress = () => {
        const { playPausedCallback } = this.context;
        playPausedCallback();
    }
}

class BottomController extends PureComponent {

    static contextTypes = {
        playPausedCallback: PropTypes.func,
        fullScreenCallback: PropTypes.func,
    }

    render() {
        let { fullScreenCallback } = this.context;
        let { now, total, playable } = this.props;
        let nowTimeStr = this._timeformat(now);
        let totalTimeStr = this._timeformat(total);
        return (
            <View style={[styles.bottomControl, this.props.widthStyle]}>
                <View style={styles.bottomBtnContainer}>
                    {Platform.OS === 'ios' &&
                        <TouchableHighlight
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={this._playPausedBtnPress}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
                                color='white'
                                size={20}
                            />
                        </TouchableHighlight>
                    }
                    {Platform.OS === 'android' &&
                        <GuestureTouchable
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={this._playPausedBtnPress}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isPaused ? 'play-circle-outline' : 'pause-circle-outline'}
                                color='white'
                                size={20}
                            />
                        </GuestureTouchable>
                    }
                </View>
                <View style={{ height: 40, width: 100, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.timeTextStyle}>{`${nowTimeStr}/${totalTimeStr}`}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ProgressBar now={this.props.seekNow} total={this.props.seekTotal} superWidthStyle={this.props.widthStyle} />
                </View>
                <View style={styles.bottomBtnContainer}>
                    {Platform.OS === 'ios' &&
                        <TouchableHighlight
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={() => fullScreenCallback()}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                                color='white'
                                size={20}
                            />
                        </TouchableHighlight>
                    }
                    {Platform.OS === 'android' &&
                        <GuestureTouchable
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            underlayColor='transparent'
                            onPress={() => fullScreenCallback()}
                        >
                            <Icons
                                style={styles.playButton}
                                name={this.props.isFullscreen ? 'fullscreen-exit' : 'fullscreen'}
                                color='white'
                                size={20}
                            />
                        </GuestureTouchable>
                    }
                </View>
            </View>
        );
    }

    _timeformat = (seconds) => {
        let secondsInt = Math.round(seconds);
        let formatHour = _.padStart(Math.floor(secondsInt / 3600).toFixed(0), 2, 0);
        let formatMinute = _.padStart(Math.floor((secondsInt % 3600) / 60).toFixed(0), 2, 0);
        let formatSecond = _.padStart((secondsInt % 60).toFixed(0), 2, 0);
        return `${formatHour}:${formatMinute}:${formatSecond}`
    }

    _playPausedBtnPress = () => {
        const { playPausedCallback } = this.context;
        playPausedCallback();
    }
}

class ProgressBar extends PureComponent {

    static contextTypes = {
        startSeekCallback: PropTypes.func,
        seekCallback: PropTypes.func
    }

    render() {
        const { seekCallback, startSeekCallback } = this.context;
        let width = this.props.superWidthStyle.width - 170;
        return (
            <Slider
                style={{ width: width, height: 20 }}
                value={this.props.now}
                onSlidingStart={() => startSeekCallback()}
                onSlidingComplete={(val) => seekCallback(val)}
                minimumValue={0}
                maximumValue={this.props.total}
                thumbStyle={styles.thumbStyle}
                trackStyle={styles.trackStyle}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
        );
    }
}

export default class BitPlayer extends PureComponent {
    constructor(props) {
        super(props);
        this.timer = null;
    }

    static propTypes = {
        source: PropTypes.object.isRequired,
        style: PropTypes.object,
        fullScreen: PropTypes.bool
    };

    static defaultProps = {
        fullScreen: false,
        source: ''
    }

    static childContextTypes = {
        playPausedCallback: PropTypes.func,
        fullScreenCallback: PropTypes.func,
        startSeekCallback: PropTypes.func,
        seekCallback: PropTypes.func,
    }

    getChildContext() {
        return {
            playPausedCallback: this._playPausedCallback,
            fullScreenCallback: this._fullScreenCallback,
            startSeekCallback: this._startSeekCallback,
            seekCallback: this._seekCallback,
        }
    }

    state = {
        isFullscreen: false,
        isLoading: true,
        isPaused: false,
        isSeeking: false,

        isShowController: false,
        controllerWidthStyle: { width: 0 },
        controllerHeightStyle: { height: 0 },

        nowTime: 0,
        totalTime: 0,
        playableTime: 0,

        seekBarNowTime: 0,
        seekBarTotal: 0,
    }

    _videoOnloadStart = () => {
        this.setState({
            isLoading: true
        });
    }

    _videoOnload = () => {
        this.setState({
            isLoading: false,
            isShowController: true
        }, () => {
            this._setTimer();
        });
    }

    _videoProgress = ({ currentTime, playableDuration, seekableDuration }) => {
        if (this.state.isSeeking) {
            this.setState({
                nowTime: currentTime,
                totalTime: seekableDuration,
                playableTime: playableDuration,
            });
        } else {
            this.setState({
                nowTime: currentTime,
                totalTime: seekableDuration,
                playableTime: playableDuration,

                seekBarNowTime: currentTime,
                seekBarTotal: seekableDuration,
            });
        }
    }

    componentDidMount() {
        if (Platform.OS == 'android') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                if (this.state.isFullscreen) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }

    render() {
        let containerStyle = this.state.isFullscreen ? styles.fullScreenContainerStyle : styles.defaultValue;
        return (
            <TapGestureHandler
                onHandlerStateChange={this._playerTap}
                waitFor={doubleTap}
            >
                <TapGestureHandler
                    ref={doubleTap}
                    numberOfTaps={2}
                    onHandlerStateChange={this._playerDoubleTap}
                >
                    <View
                        style={containerStyle}
                        onLayout={event => {
                            this.setState({
                                controllerWidthStyle: { width: event.nativeEvent.layout.width },
                                controllerHeightStyle: { height: event.nativeEvent.layout.height }
                            })
                        }}
                    >
                        {this.state.isFullscreen && <StatusBar hidden={true} />}
                        {this.state.isShowController &&
                            <HeaderController
                                isFullscreen={this.state.isFullscreen}
                                widthStyle={this.state.controllerWidthStyle}
                            />
                        }
                        {(this.state.isLoading || this.state.isShowController) &&
                            <CenterController
                                isLoading={this.state.isLoading}
                                isController={this.state.isShowController}
                                isPaused={this.state.isPaused}
                                widthStyle={this.state.controllerWidthStyle}
                                heightStyle={this.state.controllerHeightStyle}
                            />
                        }
                        {this.props.source &&
                            <Video source={{ uri: this.props.source }}
                                ref={(ref) => {
                                    this.player = ref
                                }}
                                paused={this.state.isPaused}
                                progressUpdateInterval={1000}
                                onLoadStart={this._videoOnloadStart}
                                onLoad={this._videoOnload}
                                onProgress={this._videoProgress}
                                onSeek={this._endSeek}
                                style={{ flex: 1 }} />
                        }
                        {this.state.isShowController &&
                            <BottomController
                                widthStyle={this.state.controllerWidthStyle}
                                isPaused={this.state.isPaused}
                                now={this.state.nowTime}
                                total={this.state.totalTime}
                                playable={this.state.playableTime}
                                seekNow={this.state.seekBarNowTime}
                                seekTotal={this.state.seekBarTotal}
                            />
                        }

                    </View>
                </TapGestureHandler >
            </TapGestureHandler>
        );
    }

    /**
     * fullscreen
     */
    _fullScreenCallback = () => {
        this.setState((preState) => {
            let isFullscreen = preState.isFullscreen;
            return {
                isFullscreen: !isFullscreen
            }
        }, () => {
            if (this.state.isFullscreen) {
                Orientation.lockToLandscape();
            } else {
                Orientation.lockToPortrait();
            }
        });
    }

    /**
     * seek
     */

    _startSeekCallback = () => {
        this.setState({
            isSeeking: true
        });
    }

    _seekCallback = (time) => {
        let floorTime = Math.floor(time);
        this.player.seek(floorTime);
    }

    _endSeek = () => {
        this.setState({
            isSeeking: false
        });
    }

    /**
     * play/paused
     */
    _playPausedCallback = () => {
        this.setState((preState) => {
            return {
                isPaused: !preState.isPaused
            }
        });
    }

    /**
     * 计时器设置/取消
     */
    _setTimer = () => {
        if (!this.timer) {
            this.timer = setTimeout(() => {
                if (this.state.isShowController) {
                    this.setState({
                        isShowController: false
                    }, () => {
                        if (this.timer) {
                            clearTimeout(this.timer);
                            this.timer = null;
                        }
                    });
                }
            }, delayTimes);
        }
    }

    _cancelTimer = () => {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }

    /*
      player 手势处理
    */
    _playerDoubleTap = ({ nativeEvent }) => {
        let tapGestureState = nativeEvent.state;
        if (tapGestureState == 4) {//双击手势完成
            if (
                (this.state.isFullscreen && nativeEvent.x < height / 2) ||
                (!this.state.isFullscreen && nativeEvent.x < width / 2)
            ) {
                this.setState({
                    isSeeking: true
                }, () => {
                    this.player.seek(this.state.nowTime - 5);
                });
            } else {
                this.setState({
                    isSeeking: true
                }, () => {
                    this.player.seek(this.state.nowTime + 5);
                });
            }
        }
    }

    _playerTap = ({ nativeEvent }) => {
        let tapGestureState = nativeEvent.state;
        if (tapGestureState == 1) {//ios手势取消
            if (this.state.isShowController) {
                this._setTimer();
            }
        }
        if (tapGestureState == 2) {//手势开始
            this._cancelTimer();
        }
        if (tapGestureState == 3) {//android手势取消
            if (this.state.isShowController) {
                this._setTimer();
            }
        }
        if (tapGestureState == 4) {//手势完成
            if (!this.state.isShowController) {
                this.setState({
                    isShowController: true
                }, () => {
                    this._setTimer();
                });
            } else {
                this.setState({
                    isShowController: false
                }, () => {
                    this._cancelTimer();
                });
            }
        }
        if (tapGestureState == 5) {//手指离开
            if (this.state.isShowController) {
                this._setTimer();
            }
        }
    }

}

const styles = StyleSheet.create({
    fullScreenContainerStyle: {
        display: 'flex',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'rgb(34,34,34)'
    },
    containerStyle: {
        display: 'flex'
    },
    defaultValue: {
        height: 200,
        width: Sizes.DEVICE_WIDTH,
        display: 'flex',
        backgroundColor: 'rgb(34,34,34)'
    },
    headerControl: {
        display: 'flex',
        flexDirection: 'row',
        position: 'absolute',
        top: 0,
        left: 0,
        height: 40,
        width: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    centerControl: {
        display: 'flex',
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomControl: {
        display: 'flex',
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 40,
        width: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 10
    },
    bottomBtnContainer: {
        height: 20,
        width: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timeTextStyle: {
        color: 'white',
        fontSize: 11,
    },
    playButton: {
        opacity: 0.9
    },
    thumbStyle: {
        width: 15,
        height: 15
    },
    trackStyle: {
        borderRadius: 1
    }
});