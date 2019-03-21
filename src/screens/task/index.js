import React, { PureComponent } from 'react';
import { SafeAreaView, Image, Platform, View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Colors from '../../global/Colors';
import * as In18 from '../../global/In18';
import { isXDevice } from '../../global/utils/PixelUtil';

import ModalHeader from '../../components/modal/ModalHeader';
import Toptab from './TopTab';
import BottomTaskList from './bottomTaskList';

export default class TaskScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _inviteDetails = () => {

    }

    _toIcons = () => {
        this.props.navigation.navigate('IconsListModel');;
    }

    _toGift = () => {
        this.props.navigation.navigate('GiftCenterModel');
    }

    render() {
        let isX = isXDevice();
        let bgImageStyle = { width: '100%', height: 207 - 20 };
        if (isX) {
            bgImageStyle = { width: '100%', height: 207 };
        }
        if (Platform.OS === 'android') {
            bgImageStyle = { width: '100%', height: 207 - 44 };
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Image
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }, bgImageStyle]}
                    source={require('../../image/task/task_background.png')}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <ModalHeader textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title={In18.TASK_CENTER} rightBtnMode='text' rightBtnTitle='邀请记录' rightBtnOnPress={this._inviteDetails} />
                        <Toptab toIcons={this._toIcons} toGift={this._toGift} />
                        <BottomTaskList />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    imageBackground: {
        width: '100%',
        height: 1136,//780
    }
});