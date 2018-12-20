/*react-native-video 功能测试代码 */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class MainScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    onBuffer = () => {
        console.log('is on buffer');
    }
    videoError = () => {
        console.log('is on error');
    }

    render() {
        return (
            <View style={styles.container}>
                <Video
                    source={{ uri: 'https://t.bwzybf.com/2018/11/12/d0Kixl229jxIo36g/playlist.m3u8' }}
                    ref={(ref) => { this.player = ref }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.bgVideo}
                />
            </View>
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
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});