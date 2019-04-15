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
import NavigationService from '../../../app/NavigationService';

const reg = { times: null };

class Item extends PureComponent {
    _press = () => {
        if (this.props.item.status == 0) {
            ToastRoot.show('该支付方式尚未开放，敬请期待!');
        } else {
            const time = new Date().getTime();
            if (reg.times && time - reg.times < 120000) {
                NavigationService.navigate('ToastModel', { type: 'PayBusy' });
            } else {
                let deviceId = DeviceInfo.getUniqueID();
                let deviceType = 'android';
                if (Platform.OS == 'ios') {
                    deviceType = 'ios';
                }
                reg.times = new Date().getTime();
                Api.postAddOrder(this.props.item.key, this.props.cardId, deviceType, deviceId, (e, code, message) => {
                    if (e) {
                        switch (e.target) {
                            case 0:
                                if (this.props.callback) {
                                    this.props.callback();
                                }
                                this.props.navi.navigate('PayWebView', { payUrl: e.payUrl });
                                break;
                            case 1:
                                ToastRoot.show('支付成功');
                                break;

                        }
                    } else {
                        NavigationService.navigate('ToastModel', { type: 'PayBusy' });
                    }
                });
            }
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
            this.setState({
                payListIsShow: true,
                payListArr: e
            });
        });
    }

    _ItemCallback = () => {
        this.setState({
            payListIsShow: false,
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
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>1、购买会员后在有效期内，可每日无限次观看所有视频，并享受高清影质。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>2、为保证交易公平，会员卡一经售出，不支持转让，不可退款。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>3、支付购买时，请不要修改支付金额，避免支付失败。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>4、如付款后未收到会员卡，请及时通过问题反馈或前往官方交流群，提交你的付款成功截图，由官方人员核实处理。</Text>
                        <Text style={{ color: 'rgb(141,144,153)', marginHorizontal: 15, fontSize: 14, lineHeight: 24 }}>5、切勿频繁提交支付申请，如遇支付通道繁忙，请等待两分钟后再提交。</Text>
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
                            renderItem={({ item }) => <Item callback={this._ItemCallback} navi={this.props.navigation} cardId={this.state.cardId} item={item} />}
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