import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Share } from 'react-native';
import PropTypes from 'prop-types';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

import IconBtnWithTitle from '../../components/imageBtn/IconBtnWithTitle';

export default class FunList extends PureComponent {
    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    goToMoney = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('IconsListScreen');
    }

    goToInviteCode = () => {

    }

    goToInviteFriend = () => {
        Share.share({
            message: In18.SHARE_MESSAGE,
            url: In18.SHARE_URL,
            title: In18.SHARE_TITLE
        }, {
                dialogTitle: In18.SHARE_DIALOG_TITLE
            })
            .then(this._shareResult)
            .catch((e) => { console.log(e) });
    }

    _shareResult = (result) => {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('shared with action type');
            } else {
                console.log(done);
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('dismiss');
        }
    }

    goToGiftCenter = () => {
        // const { mineNavigation } = this.context;
        // mineNavigation.navigate('TaskScreen');
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.funListContainer}>
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/member_center.png')} title={In18.MEMBER_CENTER} onPress={this.goToMoney} />
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/gift_center.png')} title={In18.GIFT_CENTER} onPress={this.goToMoney} />
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/invite_code.png')} title={In18.SHARE_CODE} onPress={this.goToInviteFriend} />
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/i_want_share.png')} title={In18.I_WANT_SHARE} onPress={this.goToGiftCenter} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 66 + 18 + 20,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    funListContainer: {
        height: 66 + 18,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 36,
        justifyContent: 'space-between',
        alignItems: 'center'
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