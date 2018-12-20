import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import WebView from 'react-native-android-fullscreen-webview-video';

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
            <WebView
                styles={{ flex: 1 }}
                source={{ uri: 'https://me.guiji365.com/share/AzUc08XrXJAC6Or7' }}
            />
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