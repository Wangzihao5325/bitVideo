import React, { PureComponent } from 'react';
import { SafeAreaView, AsyncStorage, BackHandler, Platform } from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import * as Colors from '../../global/Colors';
import { lockReg } from '../../global/Reg';
import store from '../../store/index';
import { set_lock } from '../../store/actions/lockAction';

export default class GesturePassword extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null,
            gesturesEnabled: false
        }
    };

    state = {
        message: '请输入密码',
        status: 'normal',
        password: lockReg.password,
        type: false
    };

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        if (type === 'close') {
            this.setState({
                type: true
            });
        }

        if (Platform.OS == 'android') {
            this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                return true;
            });
        }

    }

    componentWillUnmount() {
        if (this.backHandler) {
            this.backHandler.remove();
        }
    }

    onEnd = (password) => {
        if (password == this.state.password) {
            this.setState({
                status: 'right',
                message: '解锁成功'
            });
            if (this.state.type) {
                lockReg.password = '';
                store.dispatch(set_lock('false'));
                AsyncStorage.setItem('Lock_Password', lockReg.password);
                AsyncStorage.setItem('Lock_Islock', store.getState().lock.isLock);
            }
            this.props.navigation.goBack();
            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: '密码错误 请重试'
            });
        }
    }

    onStart = () => {
        this.setState({
            status: 'normal',
            message: '请输入密码'
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
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