import React, { PureComponent } from 'react';
import { SafeAreaView, Text, TouchableHighlight, StyleSheet } from 'react-native';
import * as In18 from '../../../global/In18';

import ModalHeader from '../modalComponent/ModalHeader';
import PasswordInputWithVerificationCode from '../../../components/input/PasswordInputWithVerificationCode';
import PasswordInput from '../../../components/input/PasswordInput';

export default class RegisterStepTwoScreen extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView >
                <ModalHeader title={In18.INPUT_VER_CODE} goBack={this.goBack} />
                <Text style={styles.titleText}>{In18.CLICK_TO_GET_VER_CODE}</Text>
                <Text style={styles.mobileText}>+86187****1234</Text>
                <PasswordInputWithVerificationCode style={{ marginTop: 48 }} />
                <PasswordInput placeHolder={In18.PLEASE_SET_PASSWORD} style={{ marginTop: 53 }} />
                <TouchableHighlight style={styles.btn}>
                    <Text style={styles.btnText}>{In18.REGISTER}</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    titleText: {
        marginTop: 80,
        marginLeft: 31,
        fontSize: 16,
        color: 'rgb(73,114,255)'
    },
    mobileText: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        alignSelf: 'center',
        marginTop: 36
    },
    btn: {
        height: 46,
        width: 309,
        marginLeft: 37,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 23,
        marginTop: 48,
        backgroundColor: 'rgb(73,114,255)'
    },
    btnText: {
        fontSize: 16,
        color: 'white'
    }
});