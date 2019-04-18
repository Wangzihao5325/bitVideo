import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import PropTypes from 'prop-types';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';
import * as Config from '../../global/Config';

import IconBtnWithTitle from '../../components/imageBtn/IconBtnWithTitle';

export default class FunList extends PureComponent {
    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    _goToMemberCenter = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('MemberCenterScreen');
    }

    _goToGiftCenter = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('GiftCenterModel');
    }

    _goToShare = () => {
        // const { mineNavigation } = this.context;
        // mineNavigation.navigate('TaskScreen');
        if (Config.URL_REG.invite_link) {
            Linking.openURL(Config.URL_REG.invite_link);
        }
    }

    _goToQrCode = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('QrCodeModel');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.funListContainer}>
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/member_center.png')} title={In18.MEMBER_CENTER} onPress={this._goToMemberCenter} />
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/gift_center.png')} title={In18.GIFT_CENTER} onPress={this._goToGiftCenter} />
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/invite_code.png')} title={In18.SHARE_CODE} onPress={this._goToQrCode} />
                    <IconBtnWithTitle titleStyle={{ color: 'rgb(178,178,178)' }} containerStyle={{ height: 67 }} imageStyle={{ height: 44, width: 44 }} source={require('../../image/mine/i_want_share.png')} title={In18.I_WANT_SHARE} onPress={this._goToShare} />
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