import React, { PureComponent } from 'react';
import { View, Image, DeviceEventEmitter, StyleSheet } from 'react-native';

import AESImageUtils from '../../native/AESImageUtils';
import RNFetchBlob from 'rn-fetch-blob';

export default class SecurtyImage extends PureComponent {
    state = {
        trueSource: null,
        lastSource: null
    }

    componentDidMount() {
        this._getTrueSource();
    }

    componentDidUpdate() {
        this._getTrueSource();
    }

    _getTrueSource = () => {
        let uri = this.props.source.uri;
        if (uri && uri !== this.state.lastSource) {
            let regArr = uri.split('.');
            let typeStr = regArr[regArr.length - 1];
            if (typeStr === 'ceb') {
                let fs = RNFetchBlob.fs;
                let dirs = fs.dirs;
                let fileCachePath = dirs.DocumentDir + '/ceb/' + uri.split('/').pop();
                fs.readFile(fileCachePath, 'base64')
                    .then(data => {
                        if (data) {
                            AESImageUtils.decryptFromJSBase64(data).then((e) => {
                                if (e.result) {
                                    this.setState({
                                        source: { uri: 'data:image/png;base64,' + e.result }
                                    });
                                }
                            });
                        }
                    })
                    .catch((e) => {
                        RNFetchBlob
                            .config({
                                path: fileCachePath
                            })
                            .fetch('GET', uri)
                            .then((res) => {
                                res.session('cebImage');
                                let filePath = res.path();
                                fs.readFile(filePath, 'base64')//utf8//base64
                                    .then(data => {
                                        AESImageUtils.decryptFromJSBase64(data).then((e) => {
                                            if (e.result) {
                                                this.setState({
                                                    source: { uri: 'data:image/png;base64,' + e.result }
                                                });
                                            }
                                        });
                                    });
                            });
                    })

                this.setState({ lastSource: uri });
            } else {
                this.setState({ source: this.props.source, lastSource: uri });
            }
        }
    }

    render() {
        return (
            <View style={this.props.style}>
                {this.state.source ?
                    <Image
                        resizeMethod='scale'
                        style={this.props.imageStyle ? this.props.imageStyle : this.props.style}
                        defaultSource={this.props.default ? this.props.default : null}
                        source={this.state.source} /> :
                    <Image
                        resizeMode='cover'
                        style={this.props.imageStyle ? this.props.imageStyle : this.props.style}
                        source={this.props.default} />
                }
            </View>
        );
    }
}