import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import ModalHeader from '../../../../components/modal/ModalHeader';
import * as Colors from '../../../../global/Colors';


export default class IdCard extends PureComponent {
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
                    title='身份卡'
                    rightBtnMode='none'
                />
                <View style={{ flex: 1 }}>

                </View>
            </SafeAreaView>
        );
    }
}