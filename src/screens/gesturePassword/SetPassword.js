import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import PasswordGesture from 'react-native-gesture-password';
import * as Colors from '../../global/Colors';

var Password1 = '';

export default class SetGesturePassword extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        message: 'Please input your password.',
        status: 'normal'
    };

    // Example for set password
    onEnd = (password) => {
        if (Password1 === '') {
            // The first password
            Password1 = password;
            this.setState({
                status: 'normal',
                message: 'Please input your password secondly.'
            });
        } else {
            // The second password
            if (password === Password1) {
                this.setState({
                    status: 'right',
                    message: 'Your password is set to ' + password
                });

                Password1 = '';
                // your codes to close this view
            } else {
                this.setState({
                    status: 'wrong',
                    message: 'Not the same, try again.'
                });
            }
        }
    }

    onStart = () => {
        if (Password1 === '') {
            this.setState({
                message: 'Please input your password.'
            });
        } else {
            this.setState({
                message: 'Please input your password secondly.'
            });
        }
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