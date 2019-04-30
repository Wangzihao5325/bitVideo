import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import ModalHeader from '../../../../components/modal/ModalHeader';
import * as Colors from '../../../../global/Colors';


export default class BindInviteCode extends PureComponent {
    _goBack = () => {
        this.props.navigation.goBack();
    }
    _saveInviteCode = () => {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader
                    goBack={this._goBack}
                    textStyle={{ color: 'white' }}
                    backBtnColor='rgb(255,255,255)'
                    title='邀请码'
                    rightBtnMode='text'
                    rightBtnTitle='保存'
                    rightBtnOnPress={this._saveInviteCode}
                    textStyle={{ fontSize: 16, color: 'white' }}
                />
                <View style={{ flex: 1 }}>

                </View>
            </SafeAreaView>
        );
    }
}