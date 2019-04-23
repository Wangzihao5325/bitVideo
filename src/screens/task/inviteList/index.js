import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight } from 'react-native';
import * as Colors from '../../../global/Colors';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';
import { FlatList } from 'react-native-gesture-handler';

import shortVideoList from '../../../mock/shortVideoList';

class Item extends PureComponent {
    render() {
        return (
            <View style={{ height: 50, width: '100%', display: 'flex', flexDirection: 'row' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: 'white' }}>{this.props.id}</Text>
                </View>
                {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: 'white' }}>{this.props.phone}</Text>
                </View> */}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, color: 'white' }}>{this.props.time.split(' ')[0]}</Text>
                </View>
            </View>
        );
    }
}

export default class InviteList extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        inviteNum: 0,
        data: [],
        page: -1,
        totalPage: -1,
    }

    componentDidMount() {
        Api.getInviteList((e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    inviteNum: e.data.length,
                    data: e.data,
                    page: e.current_page,
                    totalPage: e.last_page
                });
            }
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _goShare = () => {
        this.props.navigation.navigate('QrCodeModel');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='邀请记录' rightBtnMode='none' />
                    <View style={styles.banner}>
                        <Text style={{ color: 'rgb(255,168,96)', fontSize: 23 }}>{`${this.state.inviteNum}人`}</Text>
                        <Text style={{ color: 'rgb(255,255,255)', fontSize: 15, marginTop: 12 }}>已邀请好友</Text>
                    </View>

                    <View style={styles.listHeader}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: 'rgb(177,177,177)' }}>用户昵称</Text>
                        </View>
                        {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: 'rgb(177,177,177)' }}>手机号码</Text>
                        </View> */}
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: 'rgb(177,177,177)' }}>注册时间</Text>
                        </View>
                    </View>

                    {this.state.data.length > 0 &&
                        <FlatList
                            style={{ flex: 1 }}
                            data={shortVideoList}
                            renderItem={({ item }) => <Item id={item.use_user_id} phone={item.invite_mobile} time={item.created_at} />}
                        />
                    }
                    {this.state.data.length <= 0 &&
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'rgb(177,177,177)' }}>您还没有推广好友</Text>
                            <Text style={{ fontSize: 14, color: 'rgb(177,177,177)', marginTop: 20 }}>请去推广页面推广好友赢取观影天数吧</Text>
                        </View>
                    }
                    <TouchableHighlight onPress={this._goShare} underlayColor='transparent' style={{ height: 50, width: '100%', backgroundColor: 'rgb(255,184,117)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'rgb(22,24,36)', fontSize: 16 }}>{this.state.data.length > 0 ? '继续邀请' : '立即邀请'}</Text>
                    </TouchableHighlight>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    banner: {
        height: 100,
        width: 333,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,57,62)',
        borderRadius: 5,
        marginTop: 15
    },
    listHeader: {
        height: 40,
        width: '100%',
        marginTop: 20,
        backgroundColor: 'rgb(51,57,62)',
        flexDirection: 'row'
    }
});