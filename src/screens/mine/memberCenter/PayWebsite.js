import React, { Component } from 'react';
import { SafeAreaView, WebView, Linking, Platform } from 'react-native';
import * as Colors from '../../../global/Colors';
import ModalHeader from '../../../components/modal/ModalHeader';

export default class PayWebView extends Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: null
    };

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        const uri = this.props.navigation.getParam('payUrl', '');
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader backBtnColor='rgb(255,255,255)' textStyle={{ fontSize: 15, color: 'white' }} goBack={this._goBack} title='' rightBtnMode='none' />
                <WebView
                    ref={el => this._webview = el}
                    source={{ uri }}
                    style={{ flex: 1 }}
                    automaticallyAdjustContentInsets={true}
                    scalesPageToFit={true}
                    mixedContentMode={'always'}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                    // onNavigationStateChange={this._onNavigationStateChange}
                    // onShouldStartLoadWithRequest={this._onShouldStartLoadWithRequest}
                    renderError={(e) => {
                        if (e === 'WebKitErrorDomain') {
                            return;
                        }
                    }
                    }
                />
            </SafeAreaView>
        );
    }
}