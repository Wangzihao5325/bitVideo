import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

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
    render() {
        return (
            <View >
            </View>
        );
    }
}
export default class Header extends PureComponent {
    render() {
        return (
            <View>
                <TopBtns />
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
    }
});