import React, { PureComponent } from 'react';
import { SafeAreaView, TouchableHighlight, Text, StyleSheet } from 'react-native';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';

import ModalHeader from '../modalComponent/ModalHeader';
import MobileInput from '../../../components/input/MobileInput';
import PasswordInputWithVercode from '../../../components/input/PasswordInputWithVerificationCode';
import PasswordInput from '../../../components/input/PasswordInput';

let reg = { mobile: '', password: '', code: '', verCode: '' };
export default class LostPassword extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack();
    }
    submit = () => {
        console.log('go to submit');
    }
    gotoChangeCountryCode = () => {
        this.props.navigation.navigate('CountryCodeModal');
    }
    mobileTextChange = (text) => {
        reg.mobile = text;
    }
    codeTextChange = (text) => {
        reg.code = text;
    }
    getMessageCode = () => {
        Api.postMessageCode(reg.mobile, (e) => {
            if (e.verification_key) {
                reg.verCode = e.verification_key
            }
        });
    }
    passwordTextChange = (text) => {
        reg.password = text;
    }
    changeAccountPassword = () => {
        Api.postResetPassword(reg.mobile,
            reg.password,
            reg.verCode,
            reg.code,
            (e) => {
                console.log('success');
                this.props.navigation.goBack();
            });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ModalHeader title={In18.CHANGE_PASSWORD} goBack={this.goBack} />
                <MobileInput onTextChange={this.mobileTextChange} style={{ marginTop: 80 }} changeCode={this.gotoChangeCountryCode} />
                <PasswordInputWithVercode getMessageCode={this.getMessageCode} onTextChange={this.codeTextChange} style={{ marginTop: 34 }} />
                <PasswordInput onTextChange={this.passwordTextChange} style={{ marginTop: 30 }} placeHolder={In18.PLEASE_SET_PASSWORD} />
                <TouchableHighlight onPress={this.changeAccountPassword} style={styles.btn}>
                    <Text style={styles.btnText} onPress={this.submit}>
                        {In18.SUBMIT_TEXT}
                    </Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    btn: {
        height: 46,
        width: Sizes.DEVICE_WIDTH - 32 - 38,
        marginLeft: 32,
        borderRadius: 23,
        backgroundColor: 'rgb(73,114,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 48
    },
    btnText: {
        color: 'white',
        fontSize: 16
    }
});