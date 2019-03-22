import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import * as Colors from '../../../global/Colors';

import ModalHeader from '../../../components/modal/ModalHeader';



export default class MessageScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='消息中心' rightBtnMode='none' />
                </View>
            </SafeAreaView>
        );
    }
}