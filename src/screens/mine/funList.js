import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

import IconBtnWithTitle from '../../components/imageBtn/IconBtnWithTitle';

export default class FunList extends PureComponent {
    goToMoney = () => {
        console.log('go to money');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.funListContainer}>
                    <IconBtnWithTitle source={require('../../image/mine/idol_money.png')} title={In18.IDOL_MONEY} onPress={this.goToMoney} />
                    <IconBtnWithTitle source={require('../../image/mine/share_code.png')} title={In18.SHARE_CODE} onPress={this.goToMoney} />
                    <IconBtnWithTitle source={require('../../image/mine/invite_people.png')} title={In18.INVITE_PEOPLE} onPress={this.goToMoney} />
                    <IconBtnWithTitle source={require('../../image/mine/task_center.png')} title={In18.TASK_CENTER} onPress={this.goToMoney} />
                </View>
                <View style={styles.moneyShowContainer}>
                    <View style={styles.flexView}>
                        <Text style={styles.moneyText}>剩余<Text>:</Text><Text>120</Text></Text>
                    </View>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 66 + 18,
        width: '100%'
    },
    funListContainer: {
        height: 66,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 36,
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    moneyShowContainer: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 36,
    },
    moneyText: {
        fontSize: 10,
        color: 'rgb(151,151,151)',
        marginTop: 4
    },
    flexView: {
        width: Sizes.ICON_BTN_WITH_TITLE_CONTAINER_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});