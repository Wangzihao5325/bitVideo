import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Platform, ImageBackground, ScrollView, Share, CameraRoll, PermissionsAndroid, Clipboard } from 'react-native';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';
import { connect } from 'react-redux';
import * as In18 from '../../../global/In18';

import ModalHeader from '../../../components/modal/ModalHeader';
import QRCode from 'react-native-qrcode';
import { captureScreen } from "react-native-view-shot";
import ToastRoot from '../../../components/toast';

class QrCode extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        qrCode: <View style={{ height: 200, width: 200, backgroundColor: 'white' }} />
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                qrCode: <QRCode
                    value={'https://github.com'}
                    size={200}
                    bgColor='rgb(34,34,34)'
                    fgColor='white' />
            });
        }, 0);
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }


    _goToInviteFriend = () => {
        Api.postShareQrCodeMessage(this.props.inviteCode, 'official', 'qrcode', (e) => {
            if (e.content) {
                Clipboard.setString(e.content);
                ToastRoot.show('复制成功');
            }
        });
    }

    _saveQrCode = async () => {
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': '读写内存卡权限',
                        'message': '请给予读写内存卡权限以保存分享二维码'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    captureScreen({ format: "jpg", quality: 1 }).then(uri => {

                        CameraRoll.saveToCameraRoll(uri, 'photo');
                        ToastRoot.show('保存二维码成功');
                        Api.postTaskAndExchange('SAVE_PHOTO', (e) => {
                            // do nothing
                        });
                    }, error => {
                        // do nothing
                    });
                } else {
                    ToastRoot.show('权限不足，无法保存二维码');
                }
            } catch (err) {
                //
            }
        } else {
            captureScreen({ format: "jpg", quality: 1 }).then(uri => {

                CameraRoll.saveToCameraRoll(uri, 'photo');
                ToastRoot.show('保存二维码成功');
                Api.postTaskAndExchange('SAVE_PHOTO', (e, code, message) => {
                    // do nothing
                });
            }, error => {
                // do nothing
            });
        }
    }


    render() {
        return (
            <ImageBackground style={{ height: Sizes.DEVICE_HEIGHT, width: Sizes.DEVICE_WIDTH }} resizeMode='cover' source={require('../../../image/task/share_bg.png')} >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ModalHeader titleStyle={{ color: 'white' }} goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='邀请码' rightBtnMode='none' />
                        <ScrollView
                            style={{ width: Sizes.DEVICE_WIDTH }}
                            contentContainerStyle={{ alignItems: 'center' }}
                        >
                            <Text style={[styles.text, { marginTop: 40, fontWeight: 'bold' }]}>成功邀请好友安装APP</Text>
                            <Text style={[styles.text, { marginTop: 15, marginBottom: 30, fontWeight: 'bold' }]}>登录并绑定手机,赢取金币奖励</Text>
                            <ScrollView
                                style={{ height: 220, width: 220, backgroundColor: 'white' }}
                                contentContainerStyle={{ padding: 10 }}
                            >
                                {this.state.qrCode}
                            </ScrollView>
                            <Text style={[styles.text, { marginTop: 15, fontSize: 15 }]}>扫描二维码 下载蝌蚪视频</Text>
                            <Text style={[styles.text, { marginTop: 35, fontSize: 15, color: 'rgb(255,206,145)' }]}>您的专属推广邀请码</Text>
                            <Text style={[styles.text, { marginTop: 10, fontSize: 30 }]}>{this.props.inviteCode}</Text>
                            <Text style={[styles.text, { marginTop: 13, fontSize: 15 }]}>看片前请保存官网，被封后可在官网下载新APP</Text>
                            <Text style={[styles.text, { marginTop: 10, fontSize: 15 }]}>官网：www.baidu.com</Text>
                            <View style={{ marginTop: 20, height: 42, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{ height: 40, width: 100, borderColor: 'rgb(255,206,145)', borderWidth: StyleSheet.hairlineWidth, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text onPress={this._saveQrCode} style={{ fontSize: 16, color: 'rgb(255,206,145)' }}>保存二维码</Text>
                                </View>
                                <View style={{ height: 40, width: 100, borderColor: 'rgb(255,206,145)', borderWidth: StyleSheet.hairlineWidth, borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text onPress={this._goToInviteFriend} style={{ fontSize: 16, color: 'rgb(255,206,145)' }}>复制推广链接</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

function mapState2Props(store) {
    return {
        inviteCode: store.account.inviteCode,
    }
}

export default connect(mapState2Props)(QrCode);

const styles = StyleSheet.create({
    banner: {
        height: 100,
        width: 333,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,57,62)',
        borderRadius: 5,
        marginTop: 15
    },
    listHeader: {
        height: 40,
        width: '100%',
        marginTop: 20,
        backgroundColor: 'rgb(51,57,62)',
        flexDirection: 'row'
    },
    text: {
        fontSize: 18,
        color: 'white'
    }
});