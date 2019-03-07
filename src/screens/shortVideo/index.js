import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

import TabBar from '../../components/tabBar/index';

import shortVideoList from '../../mock/shortVideoList';
import ShortVideoItem from './ShortVideoItem';
const reg = { typeMap2Id: {}, type: [] };
export default class ShortVideo extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: In18.DEFALUT_SHORT_VIDEO_TYPE,
        shortVideoList: null,
    };

    componentDidMount() {
        Api.getShortVideoType((e) => {
            if (Array.isArray(e)) {
                e.forEach((item) => {
                    reg.typeMap2Id[item.title] = item.id;
                    reg.type.push(item.title);
                });

                this.setState({ type: reg.type });
                let defalutKey = reg.typeMap2Id[reg.type[0]];
                Api.getShortVideoListById(defalutKey, 10, 1, (e) => {
                    if (e.data.length > 0) {
                        this.setState({
                            headerBackTitle: e.data
                        });
                    } else {
                        //mock数据
                        this.setState({
                            headerBackTitle: shortVideoList
                        });
                    }
                });
            }
        });
    }

    _classifyChanged = (classify) => {
        console.log('type changed');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TabBar style={{ width: Sizes.DEVICE_WIDTH }} tabNames={this.state.type} tabTap={this._classifyChanged} />
                <View style={{ flex: 1 }}>
                    {false && this.state.shortVideoList && <FlatList
                        data={this.state.shortVideoList}
                        renderItem={({ item }) => {

                        }}
                    />}
                    <ShortVideoItem title='测试一哈哈' />
                </View>
            </SafeAreaView>
        );
    }
}