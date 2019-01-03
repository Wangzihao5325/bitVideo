import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WebView from 'react-native-android-fullscreen-webview-video';
import * as PixelUtil from '../../global/utils/PixelUtil';
import * as Colors from '../../global/Colors';

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

        let WV_Width = PixelUtil.webviewSizeUnifyFromDPToPX(200);
        let WV_Height = PixelUtil.webviewSizeUnifyFromDPToPX(150);
        return (
            <SafeAreaView style={styles.container}>
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
        backgroundColor: Colors.SAFE_AREA_BGCOLOR
    },
    bgVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});