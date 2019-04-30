import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TextInput, TouchableHighlight, TouchableOpacity, Linking } from 'react-native';
import * as Colors from '../../../../global/Colors';
import ModalHeader from '../../../../components/modal/ModalHeader';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QrCodeFind extends PureComponent {
    _goBack = () => {
        this.props.navigation.goBack();
    }

    onSuccess(e) {
        Linking
            .openURL(e.data)
            .catch(err => console.error('An error occured', err));
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader
                    goBack={this._goBack}
                    textStyle={{ color: 'white' }}
                    backBtnColor='rgb(255,255,255)'
                    title='填写资料找回'
                    rightBtnMode='none'
                />
                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                    topContent={
                        <Text style={styles.centerText}>
                            Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
          </Text>
                    }
                    bottomContent={
                        <TouchableOpacity style={styles.buttonTouchable}>
                            <Text style={styles.buttonText}>OK. Got it!</Text>
                        </TouchableOpacity>
                    }
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777',
    },
    textBold: {
        fontWeight: '500',
        color: '#000',
    },
    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
        padding: 16,
    },
});