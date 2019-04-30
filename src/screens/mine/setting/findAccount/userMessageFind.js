import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, TextInput, TouchableHighlight } from 'react-native';
import * as Colors from '../../../../global/Colors';
import * as Sizes from '../../../../global/Sizes';
import ModalHeader from '../../../../components/modal/ModalHeader';
import ToastRoot from '../../../../components/toast/index';
import Api from '../../../../socket/index';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const reg = { inviteCode: '', userName: '', registerTime: '', more: '' };

export default class UserMessageFind extends PureComponent {
    _goBack = () => {
        this.props.navigation.goBack();
    }
    _inviteCodeTextChange = (e) => {
        reg.inviteCode = e;
    }
    _userNameTextChange = (e) => {
        reg.userName = e;
    }
    _registerTimeTextChange = (e) => {
        reg.registerTime = e;
    }
    _moreTextChange = (e) => {
        reg.more = e;
    }
    _findAccount = (e) => {
        if (reg.more) {
            Api.findAccountByUserMessage(reg.inviteCode, reg.userName, reg.registerTime, reg.more, (e, code, message) => {
                if (message === 'success') {
                    ToastRoot.show('信息已提交，请耐心等候!');
                    this.props.navigation.goBack();
                } else {
                    ToastRoot.show('信息提交失败，请联系客服人员!');
                }
            });
        } else {
            ToastRoot.show('请填写说明备注!');
        }
    }
    componentWillUnmount() {
        reg.inviteCode = '';
        reg.userName = '';
        reg.registerTime = '';
        reg.more = '';
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader
                    goBack={this._goBack}
                    textStyle={{ color: 'white' }}
                    backBtnColor='rgb(255,255,255)'
                    title='填写资料找回'
                    rightBtnMode='none'
                />
                <KeyboardAwareScrollView>
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ color: 'rgb(254,163,91)', fontSize: 12, marginLeft: 17, marginTop: 17 }}>*以下资料可以帮助您找回账号,请尽量填写准确</Text>
                        <Text style={{ color: 'white', fontSize: 13, marginTop: 25, marginLeft: 17 }}>开通会员时的支付宝订单编号(选填)</Text>
                        <TextInput
                            onChangeText={this._inviteCodeTextChange}
                            style={{ color: 'white', height: 50, width: Sizes.DEVICE_WIDTH - 34, alignSelf: 'center', marginTop: 11, backgroundColor: 'rgb(51,57,62)', borderRadius: 5, paddingHorizontal: 10 }}
                            placeholder='请填写订单编号'
                            placeholderTextColor='rgb(139,140,145)'
                        />
                        <Text style={{ color: 'white', fontSize: 13, marginTop: 18, marginLeft: 17 }}>丢失账户用户名(选填)</Text>
                        <TextInput
                            onChangeText={this._userNameTextChange}
                            style={{ color: 'white', height: 50, width: Sizes.DEVICE_WIDTH - 34, alignSelf: 'center', marginTop: 11, backgroundColor: 'rgb(51,57,62)', borderRadius: 5, paddingHorizontal: 10 }}
                            placeholder='如:舒服的菠萝'
                            placeholderTextColor='rgb(139,140,145)'
                        />
                        <Text style={{ color: 'white', fontSize: 13, marginTop: 18, marginLeft: 17 }}>丢失账号邀请码(选填)</Text>
                        <TextInput
                            onChangeText={this._registerTimeTextChange}
                            style={{ color: 'white', height: 50, width: Sizes.DEVICE_WIDTH - 34, alignSelf: 'center', marginTop: 11, backgroundColor: 'rgb(51,57,62)', borderRadius: 5, paddingHorizontal: 10 }}
                            placeholder='G58461'
                            placeholderTextColor='rgb(139,140,145)'
                        />
                        <Text style={{ color: 'white', fontSize: 13, marginTop: 18, marginLeft: 17 }}>说明备注</Text>
                        <TextInput
                            onChangeText={this._moreTextChange}
                            style={{ color: 'white', height: 150, width: Sizes.DEVICE_WIDTH - 34, alignSelf: 'center', marginTop: 11, backgroundColor: 'rgb(51,57,62)', borderRadius: 5, paddingHorizontal: 10, paddingTop: 20, textAlignVertical: 'top', lineHeight: 20 }}
                            placeholder='请尽可能详情的描述需要找回的账号信息,可缩短找回账号所需要期限。'
                            placeholderTextColor='rgb(139,140,145)'
                            multiline={true}
                        />

                        <TouchableHighlight onPress={this._findAccount} style={{ height: 42, borderRadius: 21, width: Sizes.DEVICE_WIDTH - 34, alignSelf: 'center', backgroundColor: 'rgb(255,168,96)', marginTop: 25, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: 'rgb(22,24,36)', fontSize: 18 }}>提交资料</Text></TouchableHighlight>
                    </ScrollView>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        );
    }
}