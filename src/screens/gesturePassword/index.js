import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import * as Colors from '../../global/Colors';
import { lockReg } from '../../global/Reg';

export default class GesturePassword extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null,
            gesturesEnabled: false
        }
    };

    state = {
        message: 'Please input your password.',
        status: 'normal',
        password: lockReg.password
    };

    onEnd = (password) => {
        if (password == this.state.password) {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });
            this.props.navigation.goBack();
            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }

    onStart = () => {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }

    onReset = () => {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
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