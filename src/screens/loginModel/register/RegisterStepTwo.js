import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as In18 from '../../../global/In18';

import ModalHeader from '../modalComponent/ModalHeader';
import PasswordInputWithVerificationCode from '../../../components/input/PasswordInputWithVerificationCode';
import PasswordInput from '../../../components/input/PasswordInput';

export default class RegisterStepTwoScreen extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView >
                <ModalHeader title={In18.INPUT_VER_CODE} goBack={this.goBack} />
                <Text style={styles.titleText}>点击获取验证码至:</Text>
                <Text style={styles.mobileText}>+86187****1234</Text>
                <PasswordInputWithVerificationCode style={{ marginTop: 48 }} />
                <PasswordInput placeHolder='请设置密码(6-12位数字或字母)' style={{ marginTop: 53 }} />
                <TouchableHighlight style={styles.btn}>
                    <Text style={styles.btnText}>注册</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    titleText: {
        marginTop: 80,
        marginLeft: 31,
        fontSize: 16,
        color: 'rgb(73,114,255)'
    },
    mobileText: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        alignSelf: 'center',
        marginTop: 36
    },
    btn: {
        height: 46,
        width: 309,
        marginLeft: 37,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        marginTop: 48,
        backgroundColor: 'rgb(73,114,255)'
    },
    btnText: {
        fontSize: 16,
        color: 'white'
    }
});