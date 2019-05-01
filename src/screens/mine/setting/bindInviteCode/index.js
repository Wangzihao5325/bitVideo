import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import ModalHeader from '../../../../components/modal/ModalHeader';
import * as Colors from '../../../../global/Colors';
import { connect } from 'react-redux';
import * as Sizes from '../../../../global/Sizes';
import ToastRoot from '../../../../components/toast/index';
import Api from '../../../../socket/index';
import { get_user_info } from '../../../../store/actions/accountAction';
import store from '../../../../store/index';


const reg = { inviteCode: '' };

class BindInviteCode extends PureComponent {
    state = {
        isBind: false
    }

    componentDidMount() {
        if (this.props.inviteMeCode) {
            this.setState({
                isBind: true
            });
        }
    }

    componentWillUnmount() {
        reg.inviteCode = '';
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    _textChange = (e) => {
        reg.inviteCode = e;
    }

    _saveInviteCode = () => {
        if (reg.inviteCode) {
            Api.bindInviteCode(reg.inviteCode, (e, code, message) => {
                if (message === 'success') {
                    Api.getUserInfo((e, code, message) => {
                        if (e) {
                            store.dispatch(get_user_info(e));
                            ToastRoot.show('绑定成功');
                            this.props.navigation.goBack();
                        }
                    });
                }
            });
        } else {
            ToastRoot.show('请输入邀请码');
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                {!this.state.isBind &&
                    <ModalHeader
                        goBack={this._goBack}
                        textStyle={{ color: 'white' }}
                        backBtnColor='rgb(255,255,255)'
                        title='邀请码'
                        rightBtnMode='text'
                        rightBtnTitle='保存'
                        rightBtnOnPress={this._saveInviteCode}
                        textStyle={{ fontSize: 16, color: 'white' }}
                    />
                }
                {this.state.isBind &&
                    <ModalHeader
                        goBack={this._goBack}
                        textStyle={{ color: 'white' }}
                        backBtnColor='rgb(255,255,255)'
                        title='邀请码'
                        rightBtnMode='none'
                    />
                }
                {
                    this.state.isBind &&
                    <View style={{ borderRadius: 5, marginTop: 40, height: 50, width: Sizes.DEVICE_WIDTH - 40, alignSelf: 'center', backgroundColor: 'rgb(51,57,62)', display: 'flex', justifyContent: 'center', }}>
                        <Text style={{ color: 'white', marginLeft: 21, fontSize: 18 }}>{this.props.inviteMeCode}</Text>
                    </View>
                }
                {
                    !this.state.isBind &&
                    <TextInput onChangeText={this._textChange} style={{ borderRadius: 5, marginTop: 40, color: 'white', backgroundColor: 'rgb(51,57,62)', height: 50, width: Sizes.DEVICE_WIDTH - 40, alignSelf: 'center', paddingHorizontal: 21, fontSize: 18 }} placeholderTextColor='rgb(139,140,145)' placeholder='请填写邀请码' />
                }
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        inviteMeCode: store.account.inviteMeCode,
    }
}

export default connect(mapState2Props)(BindInviteCode);