import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, FlatList } from 'react-native';
import * as Colors from '../../../global/Colors';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';


const Item = function (props) {
    let imageSource = props.item.pay_status_label === '未支付' ? require('../../../image/mine/pay_failed.png') : require('../../../image/mine/pay_success.png');
    return (
        <View style={styles.itemContainer}>
            <View style={styles.bottomLine}></View>
            <Text style={styles.priceText}>{`¥${props.item.price_current}`}</Text>
            <View style={{ flex: 3 }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.item.vc_title}</Text>
                    <Image style={styles.itemImage} source={imageSource} />
                </View>
                <Text style={[styles.introText, { marginTop: 16 }]}>{`使用天数:${props.item.vc_daily_until}天`}</Text>
                <Text style={styles.introText}>{`订单编号:${props.item.order_no}`}</Text>
                <Text style={styles.introText}>{`交易时间:${props.item.created_at}`}</Text>
            </View>
            {/* <View style={{ flex: 2, flexDirection: 'row-reverse' }}>
                <Text style={styles.priceText}>{`¥${props.item.price_current}`}</Text>
            </View> */}
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

    state = {
        data: null
    };

    componentDidMount() {
        Api.getUserOrderList((e) => {
            if (e.data) {
                this.setState({
                    data: e.data
                });
            }
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader backBtnColor='rgb(255,255,255)' textStyle={{ fontSize: 15, color: 'white' }} goBack={this._goBack} title={In18.BUY_HISTORY} rightBtnMode='none' />
                    {/* <Item /> */}
                    {this.state.data && this.state.data.length > 0 &&
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.data}
                            renderItem={({ item }) => <Item item={item} />}
                        />
                    }
                    {
                        this.state.data && this.state.data.length == 0 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'rgb(153,153,153)', fontSize: 14 }}>暂无购买记录~~</Text>
                            <Text style={{ color: 'rgb(153,153,153)', fontSize: 14 ,marginTop:10}}>快去购买会员吧！</Text>
                        </View>
                    }
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 135 + 10 + 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    priceText: {
        fontSize: 19,
        color: 'rgb(255,184,117)',
        position: 'absolute',
        right: 28,
        top: 20,
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