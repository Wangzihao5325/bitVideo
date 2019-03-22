import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';
import * as Colors from '../../../../global/Colors';
import Api from '../../../../socket/index';
import * as Sizes from '../../../../global/Sizes';

import ModalHeader from '../../../../components/modal/ModalHeader';

class Item extends PureComponent {
    render() {
        return (
            <View style={{ marginHorizontal: 18 }}>
                <Text style={{ fontSize: 14, color: 'rgb(85,86,95)', marginTop: 24, marginBottom: 13, alignSelf: 'center' }}>{this.props.time}</Text>
                <View style={{ paddingHorizontal: 17, alignSelf: 'center', backgroundColor: 'rgb(51,57,62)', borderRadius: 5 }}>
                    <Text style={{ color: 'white', marginTop: 21 ,fontSize:18}}>系统消息</Text>
                    <Text style={{ width:Sizes.DEVICE_WIDTH-70, fontSize: 13, color: 'rgb(232,232,232)', marginTop: 13, marginBottom: 24, lineHeight: 19 }}>{this.props.msg}</Text>
                </View>
            </View>
        );
    }
}

export default class AppMessageScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: [],
        nowPage: -1,
        totalPage: -1
    }

    componentDidMount() {
        Api.getUseMsgList('system', (e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    data: e.data,
                    nowPage: e.current_page,
                    totalPage: e.last_page
                });
            }
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='官方公告' rightBtnMode='none' />
                    {this.state.data.length > 0 &&
                        <FlatList
                            data={this.state.data}
                            renderItem={({ item }) => <Item msg={item.msg} time={item.updated_at} />}
                        />
                    }
                </View>
            </SafeAreaView>
        );
    }
}