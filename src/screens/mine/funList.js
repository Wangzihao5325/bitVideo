import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import * as In18 from '../../global/In18';

import IconBtnWithTitle from '../../components/imageBtn/IconBtnWithTitle';

export default class FunList extends PureComponent {
    goToMoney = () => {
        console.log('go to money');
    }
    render() {
        return (
            <View style={styles.container}>
                <IconBtnWithTitle source={require('../../image/mine/idol_money.png')} title={In18.IDOL_MONEY} onPress={this.goToMoney} />
                <IconBtnWithTitle source={require('../../image/mine/share_code.png')} title={In18.SHARE_CODE} onPress={this.goToMoney} />
                <IconBtnWithTitle source={require('../../image/mine/invite_people.png')} title={In18.INVITE_PEOPLE} onPress={this.goToMoney} />
                <IconBtnWithTitle source={require('../../image/mine/task_center.png')} title={In18.TASK_CENTER} onPress={this.goToMoney} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 66,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 36,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    }
});