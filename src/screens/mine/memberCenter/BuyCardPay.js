import React, { PureComponent } from 'react';
import { SafeAreaView, View, StyleSheet, ImageBackground, Text, FlatList, TouchableHighlight, Platform } from 'react-native';
import * as Colors from '../../../global/Colors';
import ModalHeader from '../../../components/modal/ModalHeader';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';

import DeviceInfo from 'react-native-device-info';
import Modal from "react-native-modal";
import ToastRoot from '../../../components/toast/index';

class Item extends PureComponent {
    _press = () => {
        if (this.props.item.status == 0) {
            ToastRoot.show('该支付方式尚未开放，敬请期待!');
        } else {
            let deviceId = DeviceInfo.getUniqueID();
            let deviceType = 'android';
            if (Platform.OS == 'ios') {
                deviceType = 'ios';
            }
            Api.postAddOrder(this.props.item.key, this.props.cardId, deviceType, deviceId, (e) => {
                console.log(e);
            });
        }
    }
    render() {
        let textColor = this.props.item.status == 0 ? 'rgb(88,90,102)' : 'rgb(222,222,222)';
        return (
            <TouchableHighlight onPress={this._press} style={{ height: 70, flex: 1, backgroundColor: 'rgb(72,75,88)', marginHorizontal: 13, borderRadius: 8 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: textColor, fontSize: 17 }}>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

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
        days: '',
        cardId: '',
        payListIsShow: false,
        payListArr: []
    };

    componentDidMount() {
        const title = this.props.navigation.getParam('title', '');
        const price = this.props.navigation.getParam('price', '');
        const days = this.props.navigation.getParam('days', '');
        const cardId = this.props.navigation.getParam('id', '');
        this.setState({
            title: title,
            price: price,
            days: days,
            cardId: cardId
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _buyCard = () => {
        // to do
        Api.getPayList((e) => {
            console.log(e);
            this.setState({
                payListIsShow: true,
                payListArr: e
            });
        });
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
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>1、观影卡购买后可在观影卡有效期内，无限次观看所有视频内容。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>2、为保证交易公平，确保观影卡可正常使用，观影卡一经售出，不可退款。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>3、观影卡可重复购买，重复购买后观影卡有效时间将累计计算，用户页只展示最高级观影卡。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>4、分享邀请好友注册可延长观影卡有效时间，邀请越多，时间奖励越多。</Text>
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
                <Modal
                    backdropColor='transparent'
                    isVisible={this.state.payListIsShow}
                    onBackdropPress={() => this.setState({ payListIsShow: false })}
                    style={{ justifyContent: "flex-end", margin: 0, }}
                >
                    <View style={{ height: 200, width: '100%', backgroundColor: Colors.SCREEN_BGCOLOR }}>
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.payListArr}
                            extraData={this.state.cardId}
                            renderItem={({ item }) => <Item cardId={this.state.cardId} item={item} />}
                            ItemSeparatorComponent={() => <View style={{ height: 2, width: '100%', backgroundColor: Colors.SCREEN_BGCOLOR }} />}
                        />
                    </View>
                </Modal>
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