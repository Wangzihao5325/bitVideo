import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as Colors from '../../../global/Colors';
import * as In18 from '../../../global/In18';
import { registerReg } from '../../../global/Reg';

import ModalHeader from '../../../components/modal/ModalHeader';
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
                <Text style={styles.protocolAgreeLineText}>{In18.PROTOCOL_TEXT_PART1}<Text style={styles.highlightText}>{In18.PROTOCOL_TEXT_PART2}</Text></Text>
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
        if (this.agreeLine.state.isAgree) {
            this.props.navigation.navigate('RegisterStepTwoModal');
        }
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

    gotoChangeCountryCode = () => {
        this.props.navigation.navigate('CountryCodeModal');
    }

    mobileTextChange = (text) => {
        registerReg.mobile = text;
    }

    inviteCodeChange = (text) => {
        registerReg.inviteCode = text;
    }

    render() {
        let styleObj = { marginTop: 102 };
        if (this.state.isShowInviteInput) {
            styleObj = { marginTop: 30 }
        }
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this.goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title={In18.REGISTER} rightBtnMode='none' />
                <MobileInput style={{ marginTop: 81 }} onTextChange={this.mobileTextChange} changeCode={this.gotoChangeCountryCode} />
                <Btn
                    onPress={this.showInviteCodeInput}
                    imageSource={this.state.btnImageSource}
                    title={In18.PLEASE_INPUT_INVITE_CODE2}
                />
                {this.state.isShowInviteInput && <UnderlineInput onTextChange={this.inviteCodeChange} style={{ marginTop: 28 }} />}
                <TouchableHighlight style={[styles.nextStep, styleObj]} onPress={this.goToNext}>
                    <Text style={styles.nextStepText}>{In18.NEXT_STEP}</Text>
                </TouchableHighlight>
                <ProtocolAgreeLine ref={(ref) => this.agreeLine = ref} />
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
        color: 'rgb(255,168,96)'
    },
    nextStep: {
        height: 46,
        width: Sizes.DEVICE_WIDTH - 33 - 33,
        marginLeft: 33,
        borderRadius: 23,
        backgroundColor: 'rgb(255,168,96)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nextStepText: {
        color: 'rgb(22,24,36)',
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
        color: '#909090'
    },
    highlightText: {
        color: 'rgb(255,168,96)'
    }
});