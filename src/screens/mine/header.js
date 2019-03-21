import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { get_user_info } from '../../store/actions/accountAction';
import * as In18 from '../../global/In18';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { accountTypeTransform } from '../../global/utils/MathUtil';
import Api from '../../socket/index';
import store from '../../store/index';

import IconBtn from '../../components/imageBtn/IconBtn';

const ICON_SIZE = 26;
const CONTAINER_HEIGHT = ICON_SIZE;
class TopBtns extends PureComponent {

    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    customPress = () => {
        console.log('custom pressing');
    }
    settingPress = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('MyModel');
    }
    render() {
        return (
            <View style={styles.topBtnsContainer}>
                <IconBtn
                    height={ICON_SIZE}
                    width={ICON_SIZE}
                    onPress={this.settingPress}
                    source={require('../../image/mine/mine_settings.png')} />
                <IconBtn
                    height={ICON_SIZE}
                    width={ICON_SIZE}
                    onPress={this.settingPress}
                    source={require('../../image/mine/message.png')} />
            </View>
        );
    }
}
class Avater extends PureComponent {

    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    // login = () => {
    //     const { mineNavigation } = this.context;
    //     mineNavigation.navigate('MyModel');
    // }

    render() {
        let typeText = accountTypeTransform(this.props.type);
        return (
            <View style={styles.avaterContainer}>
                <Image style={styles.avaterImage} source={{ uri: this.props.source }} defaultSource={require('../../image/mine/mine_defalut_avater.png')} />
                <View style={styles.accountNameContainer}>
                    <Text style={styles.accountNameText}>{this.props.name}</Text>
                    <Text style={styles.accountTypeText}>{typeText}</Text>
                </View>
                <ImageBackground style={styles.imageBackground} source={require('../../image/mine/mine_recharge.png')}>
                    <Text style={styles.rechargeText}>{In18.RECHARGE}</Text>
                </ImageBackground>
            </View>
        );
    }
}
class CountList extends PureComponent {
    render() {
        let dateStr = '-';
        if (this.props.vipEndDay.length > 0) {
            let reg = this.props.vipEndDay.split(' ')[0];
            let regArr = reg.split('-');
            regArr.shift();
            dateStr = regArr.join('/');
        }
        return (
            <View style={styles.countListContainer}>
                <ImageBackground style={styles.countListboard} imageStyle={{ borderRadius: 5 }} source={require('../../image/mine/board_bg.png')}>
                    <View style={styles.watchTimesBoard}>
                        <Text style={styles.countListNumText}>{this.props.vipHasDays}</Text>
                        <Text style={styles.countListText}>{In18.LEFT_VIP_DAY}</Text>
                    </View>
                    <View style={styles.watchTimesBoard}>
                        <Text style={styles.countListNumText}>{this.props.remainCount}</Text>
                        <Text style={styles.countListText}>{In18.TODAY_WATCH_TIMES}</Text>
                    </View>
                    <View style={styles.watchTimesBoard}>
                        <Text style={styles.countListNumText}>{dateStr}</Text>
                        <Text style={styles.countListText}>{In18.LAST_DATE}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
class Header extends PureComponent {

    _onDidFocus = () => {
        Api.getUserInfo((e) => {
            if (e) {
                store.dispatch(get_user_info(e));
            }
        });
    }

    render() {
        return (
            <View>
                <NavigationEvents
                    onDidFocus={this._onDidFocus}
                />
                <TopBtns />
                <Avater source={this.props.coverPath} name={this.props.accountName} type={this.props.accountType} />
                <CountList vipEndDay={this.props.vipEndDay} vipHasDays={this.props.vipHasDays} remainCount={this.props.remainCount} total={this.props.viewCountTotal} use={this.props.viewCountUse} />
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        accountName: store.account.name,
        accountType: store.account.type,
        viewCountTotal: store.account.viewCountDailyTotal,
        viewCountUse: store.account.viewCountDailyUse,
        remainCount: store.account.remainCount,
        vipHasDays: store.account.vipHasDays,
        vipEndDay: store.account.vipEndDay,
        coverPath: store.account.coverPath,
    }
}

export default connect(mapState2Props)(Header);

const styles = StyleSheet.create({
    topBtnsContainer: {
        height: CONTAINER_HEIGHT,
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row-reverse',
        paddingLeft: 20,
        paddingRight: 18,
    },
    avaterContainer: {
        height: 70,
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avaterImage: {
        height: 63,
        width: 63,
        borderRadius: 31,
        marginTop: 7,
        marginLeft: 15
    },
    accountNameText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 10,
        marginTop: 25
    },
    accountTypeText: {
        color: 'white',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 6
    },
    accountNameContainer: {
        flex: 1,
    },
    imageBackground: {
        height: 30,
        width: 101,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    rechargeText: {
        color: 'white',
        fontSize: 14
    },
    countListContainer: {
        height: 83 + 31,
        width: '100%',
        backgroundColor: 'transparent'
    },
    countListboard: {
        flex: 1,
        flexDirection: 'row',
        height: 83,
        marginTop: 31,
        marginHorizontal: 27,
        backgroundColor: 'rgb(245,187,128)',//white
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    watchTimesBoard: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    countListNumText: {
        fontSize: 20,
        color: 'rgb(34,34,34)'
    },
    countListText: {
        fontSize: 14,
        color: 'rgb(103,103,103)',
        marginTop: 7
    },
    separate: {
        height: 20,
        width: 2,
        backgroundColor: 'rgb(192,109,47)',
        alignSelf: 'center'
    }
});