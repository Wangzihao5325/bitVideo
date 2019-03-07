import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

import TabBar from '../../components/tabBar/index';

const reg = { typeMap2Id: {}, type: [] };
export default class ShortVideo extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: In18.DEFALUT_SHORT_VIDEO_TYPE
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
                Api.getShortVideoListById(defalutKey, 10, 1,(e)=>{
                    console.log('2233116');
                    console.log(e);
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
            </SafeAreaView>
        );
    }
}