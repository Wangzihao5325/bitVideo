import React, { PureComponent } from 'react';
import { View, Image, DeviceEventEmitter, StyleSheet } from 'react-native';

import AESImageUtils from '../../native/AESImageUtils';
import RNFetchBlob from 'rn-fetch-blob';

export default class SecurtyImage extends PureComponent {
    state = {
        source: null,
        isLoading: false,
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('bitImage', (message) => {
            //收到监听加载bitmap
            this.setState({ source: { uri: 'data:image/png;base64,' + message } });

        })
    }

    componentWillUnmount() {
        if (this.listener) {
            this.listener.remove;
        }
    }

    static getDerivedStateFromProps(nextProps, preState) {
        switch (typeof nextProps.source) {
            case 'number':
                //本地图片资源号
                return { source: nextProps.source }
            case 'object':
                //在线 or 加密 or base64
                let uri = nextProps.source.uri;
                if (uri) {
                    if (uri.indexOf('data:image/png;base64,') >= 0) {
                        return preState;
                    }
                    let regArr = nextProps.source.uri.split('.');
                    let typeStr = regArr[regArr.length - 1];
                    if (typeStr === 'ceb') {
                        RNFetchBlob
                            .config({ fileCache: true })
                            .fetch('GET', nextProps.source.uri)
                            .then((res) => {
                                let filePath = res.path();
                                let fs = RNFetchBlob.fs;
                                fs.readFile(filePath, 'base64')//utf8//base64
                                    .then(data => {
                                        AESImageUtils.decryptFromJSBase64(data).then((e) => {
                                            if (e.result) {
                                                DeviceEventEmitter.emit('bitImage', e.result);
                                            }
                                        });
                                    });
                            });
                        return preState
                    } else {
                        return { source: nextProps.source }
                    }
                } else {
                    return preState
                }
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                {this.state.source &&
                    <Image
                        style={this.props.style}
                        defaultSource={require('../../image/usual/image_load_failed.png')}
                        source={this.state.source} />}
            </View>
        );
    }
}