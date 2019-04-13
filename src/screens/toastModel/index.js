import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, ImageBackground, Image } from 'react-native';

class SeeHD extends PureComponent {
    render() {
        return (
            <View style={{ height: 216, width: 242, display: 'flex', backgroundColor: 'rgb(252,252,252)', alignItems: 'center', borderRadius: 6 }}>
                <Text style={{ fontSize: 18, color: 'rgb(34,34,34)', marginTop: 35, fontWeight: 'bold' }}>非会员看高清</Text>
                <Text style={{ fontSize: 16, marginTop: 30, color: 'rgb(71,71,71)' }}>会员专属影质</Text>
                <Text style={{ fontSize: 16, marginTop: 3, color: 'rgb(71,71,71)' }}>开通会员可享受,VIP高清通道</Text>
                <TouchableHighlight style={{ height: 38, width: 196, marginTop: 30, display: 'flex' }} underlayColor='transparent'>
                    <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg.png')}>
                        <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即开通</Text>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
        );
    }
}

export default class ToastModel extends PureComponent {

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                <SeeHD />
                <TouchableHighlight style={{ height: 31, width: 31 }} onPress={this._goBack}>
                    <Image style={{ height: 31, width: 31, marginTop: 36 }} source={require('../../image/task/model_close.png')} />
                </TouchableHighlight>
            </View>
        );
    }
}