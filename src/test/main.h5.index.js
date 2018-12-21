import React, { PureComponent } from 'react';
import { Platform, PixelRatio, SafeAreaView, StyleSheet } from 'react-native';
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
        let WV_Width = 800;
        let WV_Height = 600;
        if (Platform.OS === 'android') {
            //ios以px显示 android以dp显示，需要统一
            let pixal = PixelRatio.get();
            WV_Width = WV_Width / pixal;
            WV_Height = WV_Height / pixal;
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <WebView
                    originWhitelist={['*']}
                    source={{
                        html:
                            `<div>
                            <iframe 
                              width="${WV_Width}" 
                              height="${WV_Height}" 
                              src="https://me.guiji365.com/share/AzUc08XrXJAC6Or7" 
                              frameborder="0" 
                            >
                            </iframe> 
                        </div> `
                    }}
                />
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
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});