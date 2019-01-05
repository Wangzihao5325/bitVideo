import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import IconBtnWithTitle from '../../components/imageBtn/IconBtnWithTitle';

export default class FunList extends PureComponent {
    goToMoney = () => {
        console.log('go to money');
    }
    render() {
        return (
            <View style={styles.container}>
                <IconBtnWithTitle source={require('../../image/mine/idol_money.png')} title='爱逗币' onPress={this.goToMoney} />
                <IconBtnWithTitle source={require('../../image/mine/share_code.png')} title='邀请码' onPress={this.goToMoney} />
                <IconBtnWithTitle source={require('../../image/mine/invite_people.png')} title='邀请好友' onPress={this.goToMoney} />
                <IconBtnWithTitle source={require('../../image/mine/task_center.png')} title='任务中心' onPress={this.goToMoney} />
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