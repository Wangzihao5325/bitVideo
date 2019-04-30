import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import * as Colors from '../../../../global/Colors';
import ModalHeader from '../../../../components/modal/ModalHeader';
import ToastRoot from '../../../../components/toast/index';

import QRCodeScanner from 'react-native-qrcode-scanner';
import ImagePicker from 'react-native-image-picker';

const options = {
    title: '选取身份卡',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '相册',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class QrCodeFind extends PureComponent {

    state = {
        avatarSource: null
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }

    _selectImage = () => {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                ToastRoot.show('没有权限无法找回账号...');
            } else if (response.error) {
                ToastRoot.show('哎呀呀，报错了，请优先采取其他方式找回账号吧');
            } else if (response.customButton) {
                // nothing
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader
                    goBack={this._goBack}
                    textStyle={{ color: 'white' }}
                    backBtnColor='rgb(255,255,255)'
                    title='身份卡找回'
                    rightBtnMode='text'
                    rightBtnTitle='相册'
                    rightBtnOnPress={this._selectImage}
                    textStyle={{ fontSize: 16, color: 'white' }}
                />
                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                //             topContent={
                //                 <Text style={styles.centerText}>
                //                     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                //   </Text>
                //             }
                // bottomContent={
                //     <TouchableOpacity style={styles.buttonTouchable}>
                //         <Text style={styles.buttonText}>OK. Got it!</Text>
                //     </TouchableOpacity>
                // }
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});