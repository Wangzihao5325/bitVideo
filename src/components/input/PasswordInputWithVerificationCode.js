import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, TextInput, TouchableHighlight, Text } from 'react-native';
import * as Sizes from '../../global/Sizes';

const DEFALUT_WIDTH = Sizes.DEVICE_WIDTH - 34 - 31;
export default class PasswordInputWithVerificationCode extends PureComponent {
    state = {
        text: '获取验证码',
        disable: false,
    };

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    _getMessageCode = () => {
        // this.props.getMessageCode();//
        let time = 59;
        this.setState((preState, props) => {
            return {
                text: time + ' s',
                disable: true
            }
        });
        this.interval = setInterval(() => {
            if (time === 0) {
                clearInterval(this.interval);
                this.setState((preState, props) => {
                    return {
                        text: '获取验证码',
                        disable: false
                    }
                });
                return;
            }
            time = time - 1;
            this.setState((preState, props) => {
                return {
                    text: time + ' S'
                }
            });
        }, 1000);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.contentView}>
                    <Image source={require('../../image/mine/password.png')} />
                    <TextInput
                        secureTextEntry={this.state.secureTextEntry}
                        style={styles.textInput}
                        placeholder='请输入密码'
                        placeholderTextColor='rgb(151,151,151)'
                    />
                    <TouchableHighlight
                        disabled={this.state.disable}
                        onPress={this._getMessageCode}
                        style={styles.btn}
                    >
                        <Text style={styles.text}>
                            {this.state.text}
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 44,
        width: DEFALUT_WIDTH,
        display: 'flex',
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 34
    },
    contentView: {
        height: 22,
        width: DEFALUT_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    text: {
        fontSize: 10,
        color: 'white',
    },
    textInput: {
        marginLeft: 19,
        flex: 1,
        fontSize: 16,
        color: 'rgb(54,54,54)'
    },
    btn: {
        height: 29,
        width: 82,
        borderRadius: 14,
        backgroundColor: 'rgb(73,114,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
});