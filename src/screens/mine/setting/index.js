import React, { PureComponent } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import * as Colors from '../../../global/Colors';
import ToastRoot from '../../../components/toast/index';

import ModalHeader from '../../../components/modal/ModalHeader';

export default class SettingScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.pop();
    }

    _toast = () => {
        ToastRoot.show('功能开发中，敬请期待');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this._goBack} titleStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='设置' rightBtnMode='none' />

                <View style={[styles.container, { borderBottomColor: 'rgb(81,94,101)', borderBottomWidth: StyleSheet.hairlineWidth }]}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 17, width: 12, marginLeft: 19 }} source={require('../../../image/mine/settings_account.png')} />
                        <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>账号与安全</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Image style={{ height: 14, width: 7, marginRight: 17 }} source={require('../../../image/mine/settings_right_arrow.png')} />
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={{ height: 15, width: 12, marginLeft: 19 }} source={require('../../../image/mine/gesture_password.png')} />
                        <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>密码锁</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Image style={{ height: 14, width: 7, marginRight: 17 }} source={require('../../../image/mine/settings_right_arrow.png')} />
                    </View>
                </View>

                <View style={{ height: 10, width: '100%', backgroundColor: 'rgb(26,28,41)' }} />

                <TouchableHighlight onPress={this._toast}>
                    <View style={[styles.container, { borderBottomColor: 'rgb(81,94,101)', borderBottomWidth: StyleSheet.hairlineWidth }]}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 14, width: 13, marginLeft: 19 }} source={require('../../../image/mine/settings_clear_cache.png')} />
                            <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>清理缓存</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>

                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._toast}>
                    <View style={[styles.container, { borderBottomColor: 'rgb(81,94,101)', borderBottomWidth: StyleSheet.hairlineWidth }]}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 15, width: 15, marginLeft: 19 }} source={require('../../../image/mine/settings_update.png')} />
                            <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>检查更新</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Image style={{ height: 14, width: 7, marginRight: 17 }} source={require('../../../image/mine/settings_right_arrow.png')} />
                        </View>
                    </View>
                </TouchableHighlight>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    }
});