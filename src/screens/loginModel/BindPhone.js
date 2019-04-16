import React, { PureComponent } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';
import Api from '../../socket/index';
import MobileInput from '../../components/input/MobileInput';
import PasswordInput from '../../components/input/PasswordInput';
import PasswordInputWithVerificationCode from '../../components/input/PasswordInputWithVerificationCode';
import ModalHeader from '../../components/modal/ModalHeader';
import ToastRoot from '../../components/toast/index';


let reg = { mobile: '', password: '', code: '', verCode: '' };

class MainTitle extends PureComponent {
    render() {
        return (
            <View style={styles.mainTitleContainer}>
                <View style={styles.mainTitleH1}>
                    <Text style={styles.H1Text}>Hello/撸友</Text>
                </View>
            </View>
        );
    }
}
class InputField extends PureComponent {
    state = {
        loginType: false //true 密码登陆 false 快捷登陆
    };

    static contextTypes = {
        modalNavigation: PropTypes.object
    }

    login = () => {
        const { modalNavigation } = this.context;
        Api.postBindPhone(reg.mobile, reg.verCode, reg.code, (e, code, message) => {//reg.verCode
            if (message == 'success') {
                Api.postTaskAndExchange('BIND_MOBILE', (e, code, message) => {
                    if (message === 'success') {
                        modalNavigation.goBack();
                    }
                });
            } else {
                ToastRoot.show(message);
            }
        });
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
        // const { modalNavigation } = this.context;
        // modalNavigation.navigate('CountryCodeModal');
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
        return (
            <View style={styles.inputFieldContainer}>
                <MobileInput onTextChange={this.mobileTextChange} changeCode={this.gotoChangeCountryCode} />
                {this.state.loginType && <PasswordInput onTextChange={this.passwordTextChange} style={{ marginTop: 30 }} />}
                {!this.state.loginType && <PasswordInputWithVerificationCode getMessageCode={this.getMessageCode} onTextChange={this.codeTextChange} style={{ marginTop: 30 }} />}
                <TouchableHighlight style={styles.loginBtn} onPress={this.login}>
                    <Text style={styles.loginBtnText}>绑定手机</Text>
                </TouchableHighlight>
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
                        title='绑定手机'
                        rightBtnMode='none'
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