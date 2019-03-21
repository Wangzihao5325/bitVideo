import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight } from 'react-native';
import * as Colors from '../../../global/Colors';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';

export default class QrCode extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='邀请记录' rightBtnMode='none' />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        height: 100,
        width: 333,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,57,62)',
        borderRadius: 5,
        marginTop: 15
    },
    listHeader: {
        height: 40,
        width: '100%',
        marginTop: 20,
        backgroundColor: 'rgb(51,57,62)',
        flexDirection: 'row'
    }
});