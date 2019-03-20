import React, { PureComponent } from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground, Text } from 'react-native';
import * as Colors from '../../../global/Colors';
import ModalHeader from '../../../components/modal/ModalHeader';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';

export default class BuyCardPay extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        title: '',
        price: '',
        days: ''
    };

    componentDidMount() {
        const title = this.props.navigation.getParam('title', '');
        const price = this.props.navigation.getParam('price', '');
        const days = this.props.navigation.getParam('days', '');
        this.setState({
            title: title,
            price: price,
            days: days
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _buyCard = () => {
        console.log('12122121');
    }

    render() {
        let enTitle = '';
        let titleColor = null;
        let imageSource = require('../../../image/mine/month_card.png');
        switch (this.state.title) {
            case '月卡':
                enTitle = 'MONTH CARD';
                titleColor = { color: 'rgb(47,55,80)' };
                imageSource = require('../../../image/mine/month_card.png');
                break;
            case '季卡':
                enTitle = 'SEASON CARD';
                titleColor = { color: 'rgb(122,74,49)' };
                imageSource = require('../../../image/mine/season_card.png');
                break;
            case '年卡':
                enTitle = 'YEAR CARD';
                titleColor = { color: 'rgb(122,74,49)' };
                imageSource = require('../../../image/mine/year_card.png');
                break;
            default:
                enTitle = '';
                titleColor = { color: 'rgb(47,55,80)' };
                imageSource = require('../../../image/mine/month_card.png');
                break;
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader backBtnColor='rgb(255,255,255)' textStyle={{ fontSize: 15, color: 'white' }} goBack={this._goBack} title={In18.PAY_MAKE_SURE} rightBtnMode='none' />
                    <View style={styles.banner}>
                        <ImageBackground style={styles.bgImage} source={imageSource}>
                            <Text style={[styles.titleText, titleColor]}>{this.state.title}</Text>
                            <Text style={[styles.enTitleText, titleColor]}>{enTitle}</Text>
                            <View style={styles.bottomView}>
                                <Text style={[styles.bottomText, titleColor]}>{`购买${this.state.days}天内无限次观看激情大片，专属VIP通道和资源`}</Text>
                            </View>
                        </ImageBackground>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'rgb(203,203,203)', marginLeft: 27, fontWeight: 'bold' }}>金额总计</Text>
                            <Text style={{ fontSize: 15, color: 'rgb(255,184,117)', marginRight: 27, fontWeight: 'bold' }}>{`${this.state.price}`}</Text>
                        </View>
                    </View>

                    <View style={styles.sperateView} />

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 19, color: 'white', marginTop: 15, marginLeft: 26 }}>使用卡说明</Text>
                        <View style={{ height: StyleSheet.hairlineWidth, width: Sizes.DEVICE_WIDTH - 50, marginLeft: 25, marginTop: 17 }} />
                        {/**观影卡说明 */}
                    </View>

                    <View style={{ height: 50, width: '100%', display: 'flex', flexDirection: 'row' }}>
                        <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(26,28,41)' }}>
                            <Text style={{ fontSize: 13, color: 'white' }}>应付<Text style={{ fontSize: 20, color: 'rgb(255,184,117)' }}>{`${this.state.price}`}</Text>元</Text>
                        </View>
                        <View style={{ flex: 5, backgroundColor: 'rgb(254,164,92)', justifyContent: 'center', alignItems: 'center' }}>
                            <Text onPress={this._buyCard} style={{ fontSize: 19, color: 'rgb(34,34,34)' }}>立即付款</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        height: 172,
        width: '100%',
        display: 'flex'
    },
    bgImage: {
        height: 97,
        width: 341,
        display: 'flex',
        alignSelf: 'center',
        marginTop: 20
    },
    titleText: {
        marginTop: 22,
        marginLeft: 32,
        color: 'rgb(47,55,80)',
        fontSize: 20
    },
    enTitleText: {
        marginTop: 9,
        marginLeft: 32,
        color: 'rgb(47,55,80)',
        fontSize: 10
    },
    bottomView: {
        height: 25,
        width: 341,
        backgroundColor: 'rgb(146,152,168)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomText: {
        fontSize: 11,
        color: 'rgb(44,55,80)'
    },
    sperateView: {
        height: 5,
        width: '100%',
        backgroundColor: 'rgb(26,28,41)'
    }
});