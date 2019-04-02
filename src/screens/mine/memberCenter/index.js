import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Image, Text, ImageBackground, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import * as Colors from '../../../global/Colors';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';

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
                    <Text style={styles.slogan}>{In18.BUY_CARD_SOGOGAN}</Text>
                </View>
            </View>
        </View>
    );
}

const VIPCard = function (props) {
    let titleSyle, remarkStyle, bgUrl = null;
    switch (props.type) {
        case 'MONTH':
            titleSyle = { color: 'rgb(47,55,80)' };
            remarkStyle = { color: 'rgb(99,104,121)' };
            bgUrl = require('../../../image/mine/month_card.png');
            break;
        case 'SEASON':
            titleSyle = { color: 'rgb(122,74,49)' };
            remarkStyle = { color: 'rgb(144,115,100)' };
            bgUrl = require('../../../image/mine/season_card.png');
            break;
        case 'YEAR':
            titleSyle = { color: 'rgb(122,74,49)' };
            remarkStyle = { color: 'rgb(147,99,74)' };
            bgUrl = require('../../../image/mine/year_card.png');
            break;
    }
    return (
        <ImageBackground source={bgUrl} style={styles.cardContainer}>
            <View style={{ flex: 3 }}>
                <Text style={[styles.priceText, titleSyle]}>{props.price}</Text>
                <Text style={[styles.cardInfoText, remarkStyle]}>{`${props.title}.${props.remark}`}</Text>
            </View>
            <View style={{ flex: 2, flexDirection: 'row-reverse', alignItems: 'center' }}>
                <TouchableHighlight style={styles.buyButton} onPress={props.buyCard}>
                    <Text style={styles.buyBtnText}>{In18.BUY_RIGHT_NOW}</Text>
                </TouchableHighlight>
            </View>
        </ImageBackground>
    );
}

class MemberCenter extends PureComponent {
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
        Api.getVIPCardList((e) => {
            if (e) {
                this.setState({
                    data: e
                });
            }
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _showBuyHistory = () => {
        this.props.navigation.navigate('BugListScreen');
    }

    _buyCard = (title, price, days) => {
        this.props.navigation.navigate('BuyCardPayScreen', { title: title, price: price, days: days });
    }

    render() {
        let cards = [];
        if (this.state.data && this.state.data.length > 0) {
            cards = this.state.data.map((item, index) => {
                return (
                    <VIPCard key={index} type={item.key} price={item.price_current} title={item.title} remark={item.remark} buyCard={() => this._buyCard(item.title, item.price_current, item.daily_until)} />
                );
            })
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader backBtnColor='rgb(255,255,255)' textStyle={{ fontSize: 15, color: 'white' }} goBack={this._goBack} title={In18.MEMBER_CENTER} rightBtnMode='text' rightBtnTitle={In18.BUY_HISTORY} rightBtnOnPress={this._showBuyHistory} />
                    <AvaterBanner userName={this.props.userName} />
                    {cards}
                </View>
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        userName: store.account.name,
    }
}

export default connect(mapState2Props)(MemberCenter);

const styles = StyleSheet.create({
    avaterContainer: {
        height: 48,
        width: '100%',
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20
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