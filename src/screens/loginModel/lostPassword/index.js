import React, { PureComponent } from 'react';
import { SafeAreaView, TouchableHighlight, Text, StyleSheet } from 'react-native';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';

import ModalHeader from '../modalComponent/ModalHeader';
import MobileInput from '../../../components/input/MobileInput';
import PasswordInputWithVercode from '../../../components/input/PasswordInputWithVerificationCode';
import PasswordInput from '../../../components/input/PasswordInput';

export default class LostPassword extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    submit = () => {
        console.log('go to submit');
    }
    gotoChangeCountryCode = () => {
        this.props.navigation.navigate('CountryCodeModal');
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title={In18.CHANGE_PASSWORD} goBack={this.goBack} />
                <MobileInput style={{ marginTop: 80 }} changeCode={this.gotoChangeCountryCode} />
                <PasswordInputWithVercode style={{ marginTop: 34 }} />
                <PasswordInput style={{ marginTop: 30 }} placeHolder={In18.PLEASE_SET_PASSWORD} />
                <TouchableHighlight style={styles.btn}>
                    <Text style={styles.btnText} onPress={this.submit}>
                        {In18.SUBMIT_TEXT}
                    </Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    btn: {
        height: 46,
        width: Sizes.DEVICE_WIDTH - 32 - 38,
        marginLeft: 32,
        borderRadius: 23,
        backgroundColor: 'rgb(73,114,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 48
    },
    btnText: {
        color: 'white',
        fontSize: 16
    }
});