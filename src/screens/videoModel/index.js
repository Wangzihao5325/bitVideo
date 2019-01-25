import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';

import ModalHeader from '../loginModel/modalComponent/ModalHeader';

export default class VideoModel extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title='test' goBack={this.goBack} />
            </SafeAreaView>
        );
    }
}