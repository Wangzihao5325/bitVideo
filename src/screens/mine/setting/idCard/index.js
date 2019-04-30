import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    ImageBackground,
    Image,
    Text,
    ScrollView,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
    CameraRoll,
} from 'react-native';
import ModalHeader from '../../../../components/modal/ModalHeader';
import * as Colors from '../../../../global/Colors';
import * as Sizes from '../../../../global/Sizes';
import store from '../../../../store/index';
import { connect } from 'react-redux';
import { captureScreen } from "react-native-view-shot";
import QRCode from 'react-native-qrcode';
import * as Config from '../../../../global/Config';
import ToastRoot from '../../../../components/toast/index';


class IdCard extends PureComponent {

    state = {
        qrCode: <View style={{ height: 140, width: 140, backgroundColor: 'white' }} />
    }

    componentDidMount() {
        let code = this.props.id + this.props.salt;
        setTimeout(() => {
            this.setState({
                qrCode: <QRCode
                    value={code}
                    size={140}
                    bgColor='rgb(34,34,34)'
                    fgColor='white' />
            });
        }, 0);
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    _saveQrCode = async () => {
        if (Platform.OS == 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        'title': '读写内存卡权限',
                        'message': '请给予读写内存卡权限以保存身份卡'
                    }
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    captureScreen({ format: "jpg", quality: 1 }).then(uri => {

                        CameraRoll.saveToCameraRoll(uri, 'photo');
                        ToastRoot.show('保存二维码成功');
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
            }, error => {
                // do nothing
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                    <ModalHeader
                        goBack={this._goBack}
                        textStyle={{ color: 'white' }}
                        backBtnColor='rgb(255,255,255)'
                        title='身份卡'
                        rightBtnMode='none'
                    />
                    <View style={{ height: 453 + 36, width: '100%', display: 'flex' }}>
                        <ImageBackground
                            style={{ width: 298, height: 453, alignSelf: 'center', marginTop: 36 }}
                            source={require('../../../../image/mine/id_card_bg.png')}
                        >
                            <Image style={{ height: 60, width: 60, alignSelf: 'center', marginTop: 45 }} source={require('../../../../image/avater/0.png')} />
                            <Text style={{ color: 'rgb(34,34,34)', fontSize: 16, marginTop: 17, alignSelf: 'center' }}>{this.props.accountName}</Text>
                            <Text style={{ color: 'rgb(139,140,145)', fontSize: 14, marginTop: 8, alignSelf: 'center' }}>{`编码:${this.props.nickName}`}</Text>
                            <View style={{ height: 160, width: 160, marginTop: 10, alignSelf: 'center' }}>
                                <ScrollView
                                    style={{ flex: 1 }}
                                    contentContainerStyle={{ alignItems: 'center' }}
                                >
                                    {this.state.qrCode}
                                </ScrollView>
                            </View>
                            <View style={{ height: 28, width: 178, backgroundColor: 'rgb(236,236,236)', borderRadius: 14, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontSize: 13, color: 'rgb(71,71,71)' }}>{`官网地址:${Config.URL_REG.official_url.split('//')[1]}`}</Text>
                            </View>
                        </ImageBackground>
                        <Image style={{ position: 'absolute', bottom: 0, left: 0, height: 123, width: Sizes.DEVICE_WIDTH }} source={require('../../../../image/mine/id_card_bottom_bg.png')} />
                        <View style={{ position: 'absolute', zIndex: 10, left: 0, bottom: 0, height: 60, width: Sizes.DEVICE_WIDTH, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 11, color: 'rgb(139,140,145)' }}>身份卡是个人专属身份标识</Text>
                            <Text style={{ fontSize: 11, color: 'rgb(139,140,145)', marginTop: 3 }}>可用于账号找回，请提前保存至本地，切勿泄露与他人</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, backgroundColor: 'rgb(22,30,34)' }}>
                        <ImageBackground
                            style={{ marginTop: 20, height: 60, width: 315, alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            source={require('../../../../image/mine/id_card_btn_bg.png')}
                        >
                            <TouchableHighlight
                                style={{ flex: 1, alignItems: 'center' }}
                                underlayColor='transparent'
                                onPress={this._saveQrCode}
                            >
                                <Text style={{ fontSize: 17, color: '22,24,36', marginTop: 17 }}>保存至相册</Text>
                            </TouchableHighlight>
                        </ImageBackground>
                    </View>
                </SafeAreaView>
                <View style={{ position: 'absolute', bottom: 0, left: 0, height: 50, width: Sizes.DEVICE_WIDTH, backgroundColor: 'rgb(22,30,34)' }} />
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        accountName: store.account.name,
        nickName: store.account.nickName,
        id: store.account.id,
        salt: store.account.salt
    }
}

export default connect(mapState2Props)(IdCard);