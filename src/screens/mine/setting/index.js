import React, { PureComponent } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import * as Colors from '../../../global/Colors';
import ToastRoot from '../../../components/toast/index';
import store from '../../../store/index';
import { connect } from 'react-redux';

import ModalHeader from '../../../components/modal/ModalHeader';

class SettingScreen extends PureComponent {
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

    _toGesturePassword = () => {
        if (this.props.lock === 'true') {
            this.props.navigation.navigate('GesturePasswordModel', { type: 'close' });
        } else {
            this.props.navigation.navigate('SetGesturePasswordModel');
        }
    }

    _toBindPhone = () => {
        this.props.navigation.navigate('BindPhoneModel');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this._goBack} titleStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='设置' rightBtnMode='none' />

                <TouchableHighlight onPress={this._toBindPhone} underlayColor='transparent' >
                    <View style={[styles.container, { borderBottomColor: 'rgb(81,94,101)', borderBottomWidth: StyleSheet.hairlineWidth }]}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 17, width: 12, marginLeft: 19 }} source={require('../../../image/mine/settings_account.png')} />
                            <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>账号与安全</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <Image style={{ height: 14, width: 7, marginRight: 17 }} source={require('../../../image/mine/settings_right_arrow.png')} />
                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._toGesturePassword} underlayColor='transparent' >
                    <View style={styles.container}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 15, width: 12, marginLeft: 19 }} source={require('../../../image/mine/gesture_password.png')} />
                            <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>密码锁</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                            {this.props.lock === 'true' && <Image style={{ height: 25, width: 42, marginRight: 17 }} source={require('../../../image/mine/lock_open.png')} />}
                            {this.props.lock === 'false' && <Image style={{ height: 25, width: 42, marginRight: 17 }} source={require('../../../image/mine/lock_close.png')} />}
                        </View>
                    </View>
                </TouchableHighlight>

                <View style={{ height: 10, width: '100%', backgroundColor: 'rgb(26,28,41)' }} />

                <TouchableHighlight onPress={this._toast} underlayColor='transparent'>
                    <View style={[styles.container, { borderBottomColor: 'rgb(81,94,101)', borderBottomWidth: StyleSheet.hairlineWidth }]}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image style={{ height: 14, width: 13, marginLeft: 19 }} source={require('../../../image/mine/settings_clear_cache.png')} />
                            <Text style={{ marginLeft: 12, color: 'rgb(232,232,232)', fontSize: 14 }}>清理缓存</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>

                        </View>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={this._toast} underlayColor='transparent'>
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

function mapState2Props(store) {
    return {
        lock: store.lock.isLock,
    }
}

export default connect(mapState2Props)(SettingScreen);

const styles = StyleSheet.create({
    container: {
        height: 55,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    }
});