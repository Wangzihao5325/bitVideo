import React, { PureComponent } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

import VectorIconBtn from '../../components/imageBtn/VectorIconBtn';
import MobileInput from '../../components/input/MobileInput';
import PasswordInput from '../../components/input/PasswordInput';
import PasswordInputWithVerificationCode from '../../components/input/PasswordInputWithVerificationCode';

class Header extends PureComponent {

    static contextTypes = {
        modalNavigation: PropTypes.object
    }

    goToRegister = () => {
        const { modalNavigation } = this.context;
        modalNavigation.navigate('MyRegisterModal');
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerFlexContainer}>
                    <VectorIconBtn size={21} name='chevron-left' color='rgb(73,114,255)' onPress={this.props.goBack} />
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{In18.PASSWORD_LOGIN}</Text>
                </View>
                <TouchableHighlight onPress={this.goToRegister} style={[styles.headerFlexContainer, { justifyContent: 'center' }]}>
                    <Text style={styles.headerRegister}>{In18.REGISTER}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

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
        console.log('login');
    }
    changeLoginWay = () => {
        this.setState(function (preState) {
            let newType = !preState.loginType;
            return {
                loginType: newType
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
                <MobileInput />
                {this.state.loginType && <PasswordInput style={{ marginTop: 30 }} />}
                {!this.state.loginType && <PasswordInputWithVerificationCode style={{ marginTop: 30 }} />}
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

    render() {
        return (
            <SafeAreaView>
                <Header goBack={() => this.props.navigation.goBack()} />
                <MainTitle />
                <InputField />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 13,
        height: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    headerFlexContainer: {
        height: 25,
        width: 35,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'rgb(32,32,32)'
    },
    headerRegister: {
        color: 'rgb(32,32,32)',
        fontSize: 18
    },
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
        color: 'rgb(32,32,32)',
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
        color: 'rgb(73,114,255)'
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
        backgroundColor: 'rgb(73,114,255)'
    },
    loginBtnText: {
        color: 'white',
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
        color: 'rgb(73,114,255)'
    }
});