import React, { PureComponent } from 'react';
import { View, Image, DeviceEventEmitter, StyleSheet } from 'react-native';

import AESImageUtils from '../../native/AESImageUtils';
import RNFetchBlob from 'rn-fetch-blob';

export default class SecurtyImage extends PureComponent {
    state = {
        source: null,
        lastUri: ''
    }

    static getDerivedStateFromProps(nextProps, preState) {
        let uri = nextProps.source.uri;
        if (uri && preState.lastUri !== uri) {
            if (uri.indexOf('data:image/png;base64,') >= 0) {
                return { source: nextProps.source, decode: false, lastUri: uri };;
            }
            let regArr = uri.split('.');
            let typeStr = regArr[regArr.length - 1];
            if (typeStr === 'ceb') {
                return { source: null, decode: true, lastUri: uri }
            }
            return { source: nextProps.source, decode: false, lastUri: uri };;
        } else if (uri && preState.lastUri === uri) {
            let stateUri = preState.source.uri;
            if (stateUri && stateUri.indexOf('data:image/png;base64,') >= 0) {
                return null;
            }
            return { decode: false };
        }
        return { source: nextProps.source, decode: false, lastUri: nextProps.source };
    }

    componentDidMount() {
        this._getDataAndDecode();
    }

    componentDidUpdate() {
        this._getDataAndDecode();
    }

    _getDataAndDecode = () => {
        if (this.state.decode) {
            RNFetchBlob
                .config({ fileCache: true })
                .fetch('GET', this.props.source.uri)
                .then((res) => {
                    let filePath = res.path();
                    let fs = RNFetchBlob.fs;
                    fs.readFile(filePath, 'base64')//utf8//base64
                        .then(data => {
                            AESImageUtils.decryptFromJSBase64(data).then((e) => {
                                if (e.result) {
                                    // DeviceEventEmitter.emit('bitImage', e.result);
                                    this.setState({
                                        source: { uri: 'data:image/png;base64,' + e.result, decode: false }
                                    });
                                }
                            });
                        });
                });
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