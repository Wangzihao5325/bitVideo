import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

import ModalHeader from '../modalComponent/ModalHeader';
import MobileInput from '../../../components/input/MobileInput';

export default class RegisterModal extends PureComponent {
    state = {
        isShowInviteInput: false
    };
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title='注册' goBack={this.goBack} />
                <MobileInput style={{ marginTop: 81 }} />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    inviteCodeContainer: {
        height: 114,
        width: '100%'
    },
    flexView: {
        height: 22,
        width: '100%'
    },

});