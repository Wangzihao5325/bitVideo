import React, { PureComponent } from 'react';
import { SafeAreaView, AsyncStorage } from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import * as Colors from '../../global/Colors';
import { lockReg } from '../../global/Reg';

import ModalHeader from '../../components/modal/ModalHeader';

var Password1 = '';

export default class SetGesturePassword extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null,
            // gesturesEnabled: false
        }
    };

    state = {
        message: '请输入密码',
        status: 'normal'
    };

    componentWillUnmount() {
        Password1 = '';
    }

    // Example for set password
    onEnd = (password) => {
        if (Password1 === '') {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: '请二次确认密码'
            });
        } else {
            // The second password
            if (password === Password1) {
                this.setState({
                    status: 'right',
                    message: '设置完成 密码锁开启'
                });
                lockReg.password = password;
                lockReg.isLock = 'true';
                AsyncStorage.setItem('Lock_Password', lockReg.password);
                AsyncStorage.setItem('Lock_Islock', lockReg.isLock);
                Password1 = '';
                this.props.navigation.goBack();
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message: '密码不一致,请重新设置密码'
                });
                Password1 = '';
            }
        }
    }

    onStart = () => {
        if (Password1 === '') {
            this.setState({
                message: '请输入密码'
            });
        } else {
            this.setState({
                message: '请二次确认密码'
            });
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this._goBack} titleStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='设置密码' rightBtnMode='none' />
                <PasswordGesture
                    ref='pg'
                    style={{ backgroundColor: Colors.SCREEN_BGCOLOR }}
                    status={this.state.status}
                    message={this.state.message}
                    onStart={() => this.onStart()}
                    onEnd={(password) => this.onEnd(password)}
                    interval={1000}
                    normalColor='rgb(139,140,145)'
                    rightColor='rgb(255,168,96)'
                    wrongColor='#993333'
                    textStyle={{ fontSize: 21, marginTop: 20 }}
                />
            </SafeAreaView>
        );
    }
}