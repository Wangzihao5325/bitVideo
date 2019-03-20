import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, ImageBackground, TouchableHighlight } from 'react-native';
import * as Colors from '../../../global/Colors';
import * as In18 from '../../../global/In18';

import ModalHeader from '../../../components/modal/ModalHeader';

const AvaterBanner = function (props) {
    return (
        <View style={styles.avaterContainer}>
            <Image style={styles.avaterImage} source={props.source} defaultSource={require('../../../image/usual/default_avater.png')} />
            <View style={{ flex: 1, marginLeft: 15 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={styles.userNameText}>{props.userName}</Text>
                    {/* <View></View> */}
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.slogan}>赶快开通会员卡享受无限次观看</Text>
                </View>
            </View>
        </View>
    );
}

const VIPCard = function (props) {
    return (
        <ImageBackground source={require('../../../image/mine/month_card.png')} style={styles.cardContainer}>
            <View style={{ flex: 3 }}>
                <Text style={styles.priceText}>29.00</Text>
                <Text style={styles.cardInfoText}>月卡.三十天无限观看，畅爽一夜</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row-reverse', alignItems: 'center' }}>
                <TouchableHighlight style={styles.buyButton}>
                    <Text style={styles.buyBtnText}>立即购买</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    );
}

export default class MemberCenter extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.pop();
    }

    _showBuyHistory = () => {
        this.props.navigation.navigate('BugListScreen');
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader backBtnColor='rgb(255,255,255)' textStyle={{ fontSize: 15, color: 'white' }} goBack={this._goBack} title={In18.MEMBER_CENTER} rightBtnMode='text' rightBtnTitle={In18.BUY_HISTORY} rightBtnOnPress={this._showBuyHistory} />
                    <AvaterBanner userName='汤补货' />
                    <VIPCard />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    avaterContainer: {
        height: 48,
        width: '100%',
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    avaterImage: {
        height: 48,
        width: 48,
        borderRadius: 24,
        marginLeft: 23,
    },
    userNameText: {
        color: 'white',
        fontSize: 18
    },
    slogan: {
        color: 'rgb(98,98,109)',
        fontSize: 14
    },
    cardContainer: {
        height: 97,
        width: 341,
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 10,
        alignSelf: 'center'
    },
    buyButton: {
        marginRight: 14,
        height: 28,
        width: 76,
        display: 'flex',
        backgroundColor: 'rgb(33,44,50)',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buyBtnText: {
        color: 'rgb(243,166,104)',
        fontSize: 13,
        fontWeight: 'bold'
    },
    priceText: {
        fontSize: 23,
        color: 'rgb(47,55,80)',
        marginTop: 28,
        marginLeft: 28
    },
    cardInfoText: {
        fontSize: 11,
        color: 'rgb(99,104,121)',
        marginTop: 10,
        marginLeft: 28
    }
});