import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight, ImageBackground } from 'react-native';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';
import QRCode from 'react-native-qrcode';

export default class QrCode extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <ImageBackground style={{ height: Sizes.DEVICE_HEIGHT, width: Sizes.DEVICE_WIDTH }} source={require('../../../image/task/share_bg.png')} >
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <ModalHeader titleStyle={{ color: 'white' }} goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='邀请码' rightBtnMode='none' />
                        <Text style={[styles.text, { marginTop: 40, fontWeight: 'bold' }]}>成功邀请好友安装APP</Text>
                        <Text style={[styles.text, { marginTop: 15, marginBottom: 30, fontWeight: 'bold' }]}>登录并绑定手机,赢取金币奖励</Text>
                        <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: 'white' }}>
                            <QRCode
                                value={'https://github.com'}
                                size={200}
                                bgColor='rgb(34,34,34)'
                                fgColor='white' />
                        </View>
                        <Text style={[styles.text, { marginTop: 15, fontSize: 15 }]}>扫描二维码 下载蝌蚪视频</Text>
                        <Text style={[styles.text, { marginTop: 35, fontSize: 15, color: 'rgb(255,206,145)' }]}>您的专属推广邀请码</Text>
                        <Text style={[styles.text, { marginTop: 10, fontSize: 30 }]}>k58u6r</Text>
                        <Text style={[styles.text, { marginTop: 33, fontSize: 15 }]}>看片前请保存官网，被封后可在官网下载新APP</Text>
                        <Text style={[styles.text, { marginTop: 10, fontSize: 15 }]}>官网：www.baidu.com</Text>
                        <View style={{ height: 42, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{ fontSize: 16, color: 'rgb(255,206,145)' }}>保存二维码</Text>
                            <Text style={{ fontSize: 16, color: 'rgb(255,206,145)' }}>邀请好友</Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

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