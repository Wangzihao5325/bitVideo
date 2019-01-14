import React, { PureComponent } from 'react';
import { SafeAreaView, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import * as In18 from '../../../global/In18';
import { registerReg } from '../../../global/Reg';

import ModalHeader from '../modalComponent/ModalHeader';
import PasswordInputWithVerificationCode from '../../../components/input/PasswordInputWithVerificationCode';
import PasswordInput from '../../../components/input/PasswordInput';

class RegisterStepTwoScreen extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        let mobile = registerReg.mobile.split('');
        mobile.splice(3, 4, '****');
        let securityMobile = mobile.join('');
        return (
            <SafeAreaView >
                <ModalHeader title={In18.INPUT_VER_CODE} goBack={this.goBack} />
                <Text style={styles.titleText}>{In18.CLICK_TO_GET_VER_CODE}</Text>
                <Text style={styles.mobileText}>{`${this.props.countryCode} `}<Text>{securityMobile}</Text></Text>
                <PasswordInputWithVerificationCode style={{ marginTop: 48 }} />
                <PasswordInput placeHolder={In18.PLEASE_SET_PASSWORD} style={{ marginTop: 53 }} />
                <TouchableHighlight style={styles.btn}>
                    <Text style={styles.btnText}>{In18.REGISTER}</Text>
                </TouchableHighlight>
            </SafeAreaView>
        );
    }
}
function mapState2Props(store) {
    return {
        countryCode: store.countryCode.countryCode
    }
}

export default connect(mapState2Props)(RegisterStepTwoScreen);

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