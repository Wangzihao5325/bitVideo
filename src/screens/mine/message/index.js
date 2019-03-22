import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, TouchableHighlight, Image, Text } from 'react-native';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';

import ModalHeader from '../../../components/modal/ModalHeader';

const BTN = function (props) {
    return (
        <TouchableHighlight style={styles.btnContainer} underlayColor='transparent' onPress={props.onPress}>
            <View style={{ flex: 1, flexDirection: 'row', borderBottomColor: 'rgb(81,94,101)', borderBottomWidth: StyleSheet.hairlineWidth }}>
                <Image style={styles.btnImage} source={props.source} />
                <View style={{ flex: 3 }}>
                    <Text style={{ fontSize: 15, color: 'white', marginTop: 21, marginLeft: 15 }}>{props.title}</Text>
                    <Text style={{ fontSize: 12, color: 'rgb(85,86,95)', marginTop: 10, marginLeft: 15 }}>{props.intro}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <Image style={{ height: 16, width: 8 }} source={require('../../../image/mine/message_left_arrow.png')} />
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default class MessageScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.pop();
    }

    _goToMyMessage = () => {
        this.props.navigation.navigate('MyMessageScreen');
    }

    _goToAppMessage = () => {
        this.props.navigation.navigate('AppMessageScreen');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='消息中心' rightBtnMode='none' />
                    <BTN onPress={this._goToMyMessage} source={require('../../../image/mine/my_message.png')} title='我的消息' intro='关于个人的消息都在这里哟' />
                    <BTN onPress={this._goToAppMessage} source={require('../../../image/mine/app_message.png')} title='官方公告' intro='我们会在这里说些很重要的事情哦' />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        height: 80,
        width: Sizes.DEVICE_WIDTH - 50,
        alignSelf: 'center'
    },
    btnImage: {
        height: 45,
        width: 45,
        alignSelf: 'center'
    }
});