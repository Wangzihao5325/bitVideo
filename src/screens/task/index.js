import React, { PureComponent } from 'react';
import { SafeAreaView, ImageBackground, Platform, View, Text, StyleSheet } from 'react-native';
import * as Colors from '../../global/Colors';
import * as In18 from '../../global/In18';
import { isXDevice } from '../../global/utils/PixelUtil';

import ModalHeader from '../../components/modal/ModalHeader';

export default class TaskScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _inviteDetails = () => {

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
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ImageBackground
                    style={bgImageStyle}
                    source={require('../../image/mine/mine_background.png')}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <ModalHeader textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title={In18.TASK_CENTER} rightBtnMode='text' rightBtnTitle='邀请记录' rightBtnOnPress={this._inviteDetails} />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
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