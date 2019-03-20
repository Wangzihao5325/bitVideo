import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image } from 'react-native';
import * as Colors from '../../../global/Colors';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';

import ModalHeader from '../../../components/modal/ModalHeader';

const Item = function (props) {
    return (
        <View style={styles.itemContainer}>
            <View style={styles.bottomLine}></View>
            <View style={{ flex: 3 }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>月卡</Text>
                    <Image style={styles.itemImage} source={require('../../../image/mine/pay_success.png')} />
                </View>
                <Text style={[styles.introText, { marginTop: 16 }]}>使用天数:168天</Text>
                <Text style={styles.introText}>订单编号:12345678</Text>
                <Text style={styles.introText}>交易时间:2019.03.02</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                <Text style={styles.priceText}>$169.00</Text>
            </View>
        </View>
    );
}

export default class BugListScreen extends PureComponent {
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
                    <ModalHeader backBtnColor='rgb(255,255,255)' textStyle={{ fontSize: 15, color: 'white' }} goBack={this._goBack} title={In18.BUY_HISTORY} rightBtnMode='none' />
                    <Item />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 135 + 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    priceText: {
        fontSize: 19,
        color: 'rgb(255,184,117)',
        marginRight: 28,
        marginTop: 20,
        fontWeight: 'bold'
    },
    titleContainer: {
        marginTop: 19,
        flexDirection: 'row'
    },
    itemImage: {
        height: 17,
        width: 51,
        marginLeft: 7
    },
    titleText: {
        fontSize: 18,
        color: 'white',
        marginLeft: 28,
        fontWeight: 'bold'
    },
    introText: {
        fontSize: 14,
        color: 'rgb(140,141,146)',
        marginLeft: 28,
        marginTop: 13,
        fontWeight: 'bold'
    },
    bottomLine: {
        height: 2,
        width: Sizes.DEVICE_WIDTH - 50,
        position: 'absolute',
        left: 25,
        bottom: 0,
        backgroundColor: 'rgb(81,94,101)'
    }
});