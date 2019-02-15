import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

import IconBtnWithTitle from '../../components/imageBtn/IconBtnWithTitle';

class FunList extends PureComponent {
    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    goToMoney = () => {
        console.log('go to money');
    }

    goToGiftCenter = () => {
        // const { mineNavigation } = this.context;
        // mineNavigation.navigate('TaskScreen');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.funListContainer}>
                    <IconBtnWithTitle source={require('../../image/mine/idol_money.png')} title={In18.IDOL_MONEY} onPress={this.goToMoney} />
                    <IconBtnWithTitle source={require('../../image/mine/share_code.png')} title={In18.SHARE_CODE} onPress={this.goToMoney} />
                    <IconBtnWithTitle source={require('../../image/mine/invite_people.png')} title={In18.INVITE_PEOPLE} onPress={this.goToMoney} />
                    <IconBtnWithTitle source={require('../../image/mine/task_center.png')} title={In18.GIFT_CENTER} onPress={this.goToGiftCenter} />
                </View>
                <View style={styles.moneyShowContainer}>
                    <View style={styles.flexView}>
                        <Text style={styles.moneyText}>{In18.OVERPLUS}<Text>:</Text><Text>{this.props.icons}</Text></Text>
                    </View>
                </View>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        icons: store.account.icons,
    }
}

export default connect(mapState2Props)(FunList);

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