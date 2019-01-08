import React, { PureComponent } from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import * as Sizes from '../../global/Sizes';

import IconBtn from '../../components/imageBtn/IconBtn';

const DEFALUT_WIDTH = Sizes.DEVICE_WIDTH - 34 - 31;
export default class PasswordInput extends PureComponent {
    state = {
        secureTextEntry: true
    };

    changeSecure = () => {
        this.setState(function (preState) {
            let newSecure = !preState.secureTextEntry;
            return {
                secureTextEntry: newSecure
            }
        })
    }
    render() {
        let imageSource = require('../../image/mine/eyes_close.png');
        if (!this.state.secureTextEntry) {
            imageSource = require('../../image/mine/eyes_open.png');
        }
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
                    <IconBtn
                        onPress={this.changeSecure}
                        height={16}
                        width={16}
                        source={imageSource}
                    />
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
        paddingRight: 30
    },
    text: {
        fontSize: 16,
        color: 'rgb(73,114,255)',
        marginLeft: 19
    },
    textInput: {
        marginLeft: 19,
        flex: 1,
        fontSize: 16,
        color: 'rgb(54,54,54)'
    }
});