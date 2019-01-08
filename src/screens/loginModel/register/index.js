import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text } from 'react-native';

import ModalHeader from '../modalComponent/ModalHeader';

export default class RegisterModal extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title='注册' goBack={this.goBack} />
            </SafeAreaView>
        );
    }
}