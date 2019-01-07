import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, ImageBackground } from 'react-native';
import * as In18 from '../../global/In18';
import PropTypes from 'prop-types';

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
                    onPress={this.customPress}
                    source={require('../../image/mine/mine_custom.png')} />
                <IconBtn
                    height={ICON_SIZE}
                    width={ICON_SIZE}
                    onPress={this.settingPress}
                    source={require('../../image/mine/mine_settings.png')} />
            </View>
        );
    }
}
class Avater extends PureComponent {
    login = () => {
        console.log('please login');
    }
    register = () => {
        console.log('please register');
    }
    render() {
        return (
            <View style={styles.avaterContainer}>
                <Image style={styles.avaterImage} source={require('../../image/mine/mine_defalut_avater.png')} />
                <Text style={styles.LoginText}><Text onPress={this.login}>{In18.LOGIN}</Text>/<Text onPress={this.register}>{In18.REGISTER}</Text></Text>
                <View style={styles.rechargeContainer}>
                    <ImageBackground style={styles.imageBackground} source={require('../../image/mine/mine_recharge.png')}>
                        <Text style={styles.rechargeText}>{In18.RECHARGE}</Text>
                    </ImageBackground>
                </View>
            </View>
        );
    }
}
class CountList extends PureComponent {
    render() {
        return (
            <View style={styles.countListContainer}>
                <View style={styles.countListboard}>
                    <View style={styles.watchTimesBoard}>
                        <Text style={styles.countListNumText}><Text>0</Text>/9</Text>
                        <Text style={styles.countListText}>{In18.TODAY_WATCH_TIMES}</Text>
                    </View>
                    <View style={styles.separate} />
                    <View style={styles.watchTimesBoard}>
                        <Image source={require('../../image/mine/mine_share.png')} />
                        <Text style={styles.countListText}>{In18.SHARE_TIMES}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
export default class Header extends PureComponent {
    render() {
        return (
            <View>
                <TopBtns />
                <Avater />
                <CountList />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    topBtnsContainer: {
        height: CONTAINER_HEIGHT,
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 18,
    },
    avaterContainer: {
        height: 70,
        width: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
    },
    avaterImage: {
        height: 63,
        width: 63,
        borderRadius: 31,
        marginTop: 7,
        marginLeft: 15
    },
    LoginText: {
        color: 'white',
        fontSize: 18,
        alignSelf: 'center',
        marginLeft: 23,
        marginTop: 15
    },
    rechargeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        backgroundColor: 'white',
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
        color: 'rgb(73,114,255)'
    },
    countListText: {
        fontSize: 14,
        color: 'rgb(54,54,54)',
        marginTop: 7
    },
    separate: {
        height: 20,
        width: 2,
        backgroundColor: 'rgb(220,216,217)',
        alignSelf: 'center'
    }
});