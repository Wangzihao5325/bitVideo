import React, { PureComponent } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';
import Api from '../../socket/index';
import Variables from '../../global/Variables';

import VectorIconBtn from '../../components/imageBtn/VectorIconBtn';
import MobileInput from '../../components/input/MobileInput';
import PasswordInput from '../../components/input/PasswordInput';
import PasswordInputWithVerificationCode from '../../components/input/PasswordInputWithVerificationCode';
import ModalHeader from '../../components/modal/ModalHeader';

let reg = { mobile: '', password: '', code: '', verCode: '123' };

class MainTitle extends PureComponent {
    render() {
        return (
            <View style={styles.mainTitleContainer}>
                <View style={styles.mainTitleH1}>
                    <Text style={styles.H1Text}>{In18.WELCOME_BACK}</Text>
                </View>
                <View style={styles.mainTitleH2}>
                    <Text style={styles.H2Text}>{In18.SIGN_IN_TO_CONTAINE}</Text>
                </View>
            </View>
        );
    }
}
class InputField extends PureComponent {
    state = {
        loginType: true //true 密码登陆 false 快捷登陆
    };

    static contextTypes = {
        modalNavigation: PropTypes.object
    }

    lostPassword = () => {
        const { modalNavigation } = this.context;
        modalNavigation.navigate('LostPasswordModal');
    }

    login = () => {
        if (this.state.loginType) {
            Api.postLogin(reg.mobile, 'P', reg.password, null, this.loginSuccess);
        } else {
            Api.postLogin(reg.mobile, 'C', reg.code, reg.verCode, this.loginSuccess);
        }
    }

    loginSuccess = (e) => {
        if (e.token) {
            Variables.account.token = e.token;
        }
        // console.log(e);
        const { modalNavigation } = this.context;
        modalNavigation.pop();
    }

    changeLoginWay = () => {
        this.setState(function (preState) {
            let newType = !preState.loginType;
            return {
                loginType: newType
            }
        });
    }

    gotoChangeCountryCode = () => {
        const { modalNavigation } = this.context;
        modalNavigation.navigate('CountryCodeModal');
    }

    mobileTextChange = (mobileText) => {
        reg.mobile = mobileText;
    }

    passwordTextChange = (passwordText) => {
        reg.password = passwordText;
    }

    codeTextChange = (codeText) => {
        reg.code = codeText;
    }

    getMessageCode = () => {
        Api.postMessageCode(reg.mobile, (e) => {
            if (e.verification_key) {
                reg.verCode = e.verification_key
            }
        });
    }

    render() {
        let loginTypeText = In18.FAST_LOGIN;
        if (!this.state.loginType) {
            loginTypeText = In18.PASSWORD_LOGIN;
        }
        return (
            <View style={styles.inputFieldContainer}>
                <MobileInput onTextChange={this.mobileTextChange} changeCode={this.gotoChangeCountryCode} />
                {this.state.loginType && <PasswordInput onTextChange={this.passwordTextChange} style={{ marginTop: 30 }} />}
                {!this.state.loginType && <PasswordInputWithVerificationCode getMessageCode={this.getMessageCode} onTextChange={this.codeTextChange} style={{ marginTop: 30 }} />}
                <View style={styles.lostPasswordContainer}>
                    <Text
                        style={styles.lostPasswordText}
                        onPress={this.lostPassword}
                    >
                        {In18.LOST_PASSWORD}
                    </Text>
                </View>
                <TouchableHighlight style={styles.loginBtn} onPress={this.login}>
                    <Text style={styles.loginBtnText}>{In18.LOGIN}</Text>
                </TouchableHighlight>
                <View style={styles.changeLoginWayContainer}>
                    <Text style={styles.changeLoginWayText} onPress={this.changeLoginWay}>{loginTypeText}</Text>
                </View>
            </View>
        );
    }
}
export default class LoginModel extends PureComponent {

    static childContextTypes = {
        modalNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            modalNavigation: this.props.navigation
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    _goToRegister = () => {
        this.props.navigation.navigate('MyRegisterModal');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader
                        goBack={this._goBack}
                        textStyle={{ color: 'white' }}
                        backBtnColor='rgb(255,255,255)'
                        title={In18.PASSWORD_LOGIN}
                        rightBtnMode='text'
                        rightBtnTitle={In18.REGISTER}
                        rightBtnOnPress={this._goToRegister}
                    />
                    <MainTitle />
                    <InputField />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    mainTitleContainer: {
        height: 72,
        width: '100%',
        marginTop: 80,
        display: 'flex'
    },
    mainTitleH1: {
        flex: 1,
        height: 33,
        marginLeft: 30,
        justifyContent: 'center'
    },
    H1Text: {
        color: 'white',
        fontSize: 24
    },
    mainTitleH2: {
        flex: 1,
        height: 22,
        marginLeft: 34,
        justifyContent: 'center'
    },
    H2Text: {
        color: 'rgb(151,151,151)',
        fontSize: 16
    },
    inputFieldContainer: {
        height: 200,
        width: '100%',
        marginTop: 58
    },
    lostPasswordContainer: {
        marginTop: 10,
        height: 17,
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    lostPasswordText: {
        marginRight: 42.5,
        fontSize: 12,
        color: 'rgb(255,168,96)'
    },
    loginBtn: {
        marginTop: 30,
        height: 46,
        width: Sizes.DEVICE_WIDTH - 34 - 31,
        marginLeft: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        backgroundColor: 'rgb(255,168,96)'
    },
    loginBtnText: {
        color: 'rgb(22,24,36)',
        fontSize: 16
    },
    changeLoginWayContainer: {
        marginTop: 24,
        height: 22,
        width: Sizes.DEVICE_WIDTH - 34 - 31,
        marginLeft: 34,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    changeLoginWayText: {
        fontSize: 16,
        color: 'rgb(255,168,96)'
    }
});