import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Platform, Linking, AsyncStorage } from 'react-native';
import * as Colors from '../../../../global/Colors';
import ModalHeader from '../../../../components/modal/ModalHeader';
import ToastRoot from '../../../../components/toast/index';
import Api from '../../../../socket/index';
import Variables from '../../../../global/Variables';
import { get_user_info } from '../../../../store/actions/accountAction';



import QRCodeScanner from 'react-native-qrcode-scanner';
import ImagePicker from 'react-native-image-picker';
import { QRreader } from 'react-native-qr-scanner';
import DeviceInfo from 'react-native-device-info';


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

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    onSuccess(e) {
        if (e.data) {
            let deviceIdreg = DeviceInfo.getUniqueID();
            Api.findAccountByIdCard(e.data, deviceIdreg, (e, code, message) => {
                if (message == 'success') {
                    AsyncStorage.setItem('User_Token', e.api_token);
                    Variables.account.token = e.api_token;
                    Variables.account.deviceToken = e.api_token;
                    Api.getUserInfo((getUser_e, code, message) => {
                        if (getUser_e) {
                            store.dispatch(get_user_info(getUser_e));
                            ToastRoot.show('账号找回成功');
                            this.props.navigation.goBack();
                        }
                    });
                } else {
                    ToastRoot.show(message);
                    if (this.scanner) {
                        this.timer = setTimeout(() => {
                            this.scanner.reactivate();
                            if (this.timer) {
                                clearTimeout(this.timer);
                            }
                        }, 2000)
                    }
                }
            });
        }
    }

    _selectImage = () => {
        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
                //ToastRoot.show('');
            } else if (response.error) {
                ToastRoot.show('哎呀呀，报错了，请优先采取其他方式找回账号吧');
            } else if (response.customButton) {
                // nothing
            } else {
                let imageSource = Platform.OS === 'ios' ? response.uri : response.path;
                //uri
                QRreader(imageSource).then((data) => {
                    if (data) {
                        let deviceIdreg = DeviceInfo.getUniqueID();
                        Api.findAccountByIdCard(data, deviceIdreg, (e, code, message) => {
                            if (message == 'success') {
                                AsyncStorage.setItem('User_Token', e.api_token);
                                Variables.account.token = e.api_token;
                                Variables.account.deviceToken = e.api_token;
                                Api.getUserInfo((getUser_e, code, message) => {
                                    if (getUser_e) {
                                        store.dispatch(get_user_info(getUser_e));
                                        ToastRoot.show('账号找回成功');
                                        this.props.navigation.goBack();
                                    }
                                });
                            } else {
                                ToastRoot.show(message);
                            }
                        });
                    }
                }).catch((err) => {
                    ToastRoot.show('哎呀呀，报错了，请优先采取其他方式找回账号吧');
                });

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
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
                    ref={(node) => { this.scanner = node }}
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