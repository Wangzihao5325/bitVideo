import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

import IconBtn from '../../components/imageBtn/IconBtn';

const ICON_SIZE = 26;
const CONTAINER_HEIGHT = ICON_SIZE;
class TopBtns extends PureComponent {
    customPress = () => {
        console.log('custom pressing');
    }
    settingPress = () => {
        console.log('setting pressing');
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
                <Text style={styles.LoginText}><Text onPress={this.login}>登陆</Text>/<Text onPress={this.register}>注册</Text></Text>
                <View style={styles.rechargeContainer}></View>
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
        marginLeft: 23
    },
    rechargeContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});