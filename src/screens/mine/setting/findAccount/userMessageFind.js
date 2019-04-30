import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import * as Colors from '../../../../global/Colors';
import ModalHeader from '../../../../components/modal/ModalHeader';


export default class UserMessageFind extends PureComponent {
    _goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader
                    goBack={this._goBack}
                    textStyle={{ color: 'white' }}
                    backBtnColor='rgb(255,255,255)'
                    title='找回账号'
                    rightBtnMode='none'
                />
            </SafeAreaView>
        );
    }
}