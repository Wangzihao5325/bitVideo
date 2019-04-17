import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, Platform, ImageBackground, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';
import { isXDevice } from '../../../global/utils/PixelUtil';
import ToastRoot from '../../../components/toast/index';
import store from '../../../store/index';
import { get_user_info } from '../../../store/actions/accountAction';

import ModalHeader from '../../../components/modal/ModalHeader';


class Item extends PureComponent {
    static contextTypes = {
        giftNavigation: PropTypes.object
    }

    _onPress = () => {
        if (this.props.sign == 1) {
            ToastRoot.show('您已经兑换过该项福利');
            return;
        }
        if (this.props.haveCoins >= this.props.coin) {
            Api.postTaskAndExchange(this.props.eventId, (e, code, message) => {
                if (message == 'success') {
                    ToastRoot.show('兑换成功');
                    Api.getUserInfo((e, code, message) => {
                        if (e) {
                            store.dispatch(get_user_info(e));
                        }
                    });
                    Api.getUserExchangeList((e) => {
                        if (Array.isArray(e) && e.length > 0) {
                            if (this.props.pressCallback) {
                                this.props.pressCallback(e);
                            }
                        }
                    });
                } else {
                    ToastRoot.show('兑换失败');
                }
            });
        } else {
            const { giftNavigation } = this.context;
            giftNavigation.navigate('TaskScreen');
        }
    }

    render() {
        let text = '';
        let btnStyle = null;
        let textStyle = null;

        if (this.props.sign == 0) {
            if (this.props.haveCoins > this.props.coin) {
                text = '立即兑换';
                btnStyle = { backgroundColor: 'rgb(33,45,49)' };
                textStyle = { color: 'white' }
            } else {
                text = '去做任务';
                btnStyle = { backgroundColor: 'rgb(247,203,148)' };
                textStyle = { color: 'rgb(34,34,34)' }
            }
        } else if (this.props.sign == 1) {
            text = '兑换完毕';
            btnStyle = { backgroundColor: 'rgb(33,45,49)' };
            textStyle = { color: 'white' }
        }
        return (
            <View style={styles.itemContainer}>
                <View style={{ flex: 2 }}>
                    <Image style={styles.itemIcon} source={{ uri: this.props.url }} />
                </View>
                <View style={{ flex: 5, borderBottomColor: 'rgb(246,246,246)', borderBottomWidth: StyleSheet.hairlineWidth }}>
                    <Text style={styles.itemTitleText}>{this.props.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 6, marginLeft: 15, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, color: 'rgb(255,190,124)' }}>{`-${this.props.coin}`}<Text style={{ color: 'rgb(169,169,169)' }}>金币</Text></Text>
                        <Text style={{ color: 'rgb(169,169,169)', fontSize: 14 }}>{`有效期:${this.props.date}`}</Text>
                    </View>
                </View>
                <View style={{ flex: 3, flexDirection: 'row-reverse', alignItems: 'center', borderBottomColor: 'rgb(246,246,246)', borderBottomWidth: StyleSheet.hairlineWidth }}>
                    <TouchableHighlight style={[styles.itemBtn, btnStyle]}>
                        <Text onPress={this._onPress} style={[styles.btnText, textStyle]}>{text}</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

class GiftCenterModel extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: []
    }

    static childContextTypes = {
        giftNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            giftNavigation: this.props.navigation
        }
    }

    componentDidMount() {
        Api.getUserExchangeList((e) => {
            if (Array.isArray(e) && e.length > 0) {
                this.setState({
                    data: e
                });
            }
        });
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    _pressCallback = (e) => {
        this.setState({
            data: e
        });
    }


    render() {
        let isX = isXDevice();
        let bgImageStyle = { width: '100%', height: 207 - 20 };
        if (isX) {
            bgImageStyle = { width: '100%', height: 207 };
        }
        if (Platform.OS === 'android') {
            bgImageStyle = { width: '100%', height: 207 - 44 };
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Image
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }, bgImageStyle]}
                    source={require('../../../image/task/task_background.png')}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='兑换中心' rightBtnMode='none' />
                        <View style={styles.container}>
                            <ImageBackground style={styles.bannerBg} source={require('../../../image/task/coin_list_bar.png')}>
                                <Text style={{ color: 'rgb(34,34,34)', fontSize: 28 }}>{this.props.coins}</Text>
                                <Text style={{ color: 'rgb(103,103,103)', fontSize: 15, marginTop: 8, fontWeight: 'bold' }}>当前金币</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.title}>
                            <Text style={styles.titleText}>特权兑换</Text>
                        </View>
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.data}
                            extraData={this.props.coins}
                            renderItem={({ item }) => <Item sign={item.sign} pressCallback={this._pressCallback} eventId={item.key} haveCoins={this.props.coins} date={item.untile} url={item.icon_path} title={item.title} coin={item.coins} />}
                        />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        coins: store.account.icons,
    }
}

export default connect(mapState2Props)(GiftCenterModel);

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 337,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    bannerBg: {
        height: 100,
        width: 337,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        height: 48,
        width: '100%',
        borderBottomColor: 'rgb(246,246,246)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 16,
        color: 'rgb(34,34,34)',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        height: 75,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    itemIcon: {
        height: 42,
        width: 42,
        marginLeft: 19,
        marginTop: 18
    },
    itemTitleText: {
        color: 'rgb(34,34,34)',
        fontSize: 14,
        marginLeft: 15,
        marginTop: 22
    },
    itemBtn: {
        height: 28,
        width: 72,
        borderRadius: 14,
        backgroundColor: 'rgb(247,203,148)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    btnText: {
        color: 'rgb(34,34,34)',
        fontSize: 13,

    }
});