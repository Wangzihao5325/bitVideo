import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';
import * as Sizes from '../../../global/Sizes';

import ModalHeader from '../modalComponent/ModalHeader';
import MobileInput from '../../../components/input/MobileInput';
import UnderlineInput from '../../../components/input/UnderlineInput';

class Btn extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.btnContainer} onPress={this.props.onPress} underlayColor='transparent'>
                <View style={styles.flexView}>
                    <Text style={styles.btnText} >{this.props.title}</Text>
                    <Image style={{ marginLeft: 19 }} source={this.props.imageSource} />
                </View>
            </TouchableHighlight>
        );
    }
}

class ProtocolAgreeLine extends PureComponent {
    state = {
        isAgree: false,
        source: require('../../../image/mine/not_agree_protocol.png')
    }
    pressing = () => {
        this.setState(function (preState) {
            if (preState.isAgree) {
                return {
                    isAgree: false,
                    source: require('../../../image/mine/not_agree_protocol.png')
                }
            } else {
                return {
                    isAgree: true,
                    source: require('../../../image/mine/agree_protocol.png')
                }
            }
        });
    }
    render() {
        return (
            <View style={styles.protocolAgreeLineContainer}>
                <TouchableHighlight style={{ marginLeft: 78 }} onPress={this.pressing} underlayColor='transparent'>
                    <Image source={this.state.source}></Image>
                </TouchableHighlight>
                <Text style={styles.protocolAgreeLineText}>我已阅读并已同意<Text style={styles.highlightText}>《用户注册协议》</Text></Text>
            </View>
        );
    }
}

export default class RegisterModal extends PureComponent {
    state = {
        isShowInviteInput: false,
        btnImageSource: require('../../../image/mine/arrow_down.png')
    };
    goBack = () => {
        this.props.navigation.goBack()
    }
    goToNext = () => {
        console.log('go to next');
    }
    showInviteCodeInput = () => {
        this.setState(function (preState) {
            if (preState.isShowInviteInput) {
                return {
                    isShowInviteInput: false,
                    btnImageSource: require('../../../image/mine/arrow_down.png')
                };
            } else {
                return {
                    isShowInviteInput: true,
                    btnImageSource: require('../../../image/mine/arrow_up.png')
                }
            }
        });
    }
    render() {
        let styleObj = { marginTop: 102 };
        if (this.state.isShowInviteInput) {
            styleObj = { marginTop: 30 }
        }
        return (
            <SafeAreaView>
                <ModalHeader title='注册' goBack={this.goBack} />
                <MobileInput style={{ marginTop: 81 }} />
                <Btn
                    onPress={this.showInviteCodeInput}
                    imageSource={this.state.btnImageSource}
                    title='请输入邀请码(选填)'
                />
                {this.state.isShowInviteInput && <UnderlineInput style={{ marginTop: 28 }} />}
                <TouchableHighlight style={[styles.nextStep, styleObj]} onPress={this.goToNext}>
                    <Text style={styles.nextStepText}>下一步</Text>
                </TouchableHighlight>
                <ProtocolAgreeLine />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    btnContainer: {
        height: 22,
        width: 200,
        marginLeft: 34,
        display: 'flex',
        marginTop: 22
    },
    flexView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnText: {
        fontSize: 16,
        color: 'rgb(73,114,255)'
    },
    nextStep: {
        height: 46,
        width: Sizes.DEVICE_WIDTH - 33 - 33,
        marginLeft: 33,
        borderRadius: 23,
        backgroundColor: 'rgb(73,114,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextStepText: {
        color: 'white',
        fontSize: 16
    },
    protocolAgreeLineContainer: {
        marginTop: 20,
        height: 17,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    protocolAgreeLineText: {
        marginLeft: 14,
        fontSize: 12,
        color: 'rgb(54,54,54)'
    },
    highlightText: {
        color: 'rgb(73,114,255)'
    }
});