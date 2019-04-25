import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, ImageBackground, Image, StatusBar, Platform, Linking } from 'react-native';
import PropTypes from 'prop-types';
import * as Config from '../../global/Config';


class NewVersionForce extends PureComponent {
    static contextTypes = {
        toastNavigation: PropTypes.object
    }

    _btnPress = () => {
        Linking.openURL(this.props.url);
    }

    render() {
        return (
            <ImageBackground style={{ height: 276, width: 240, display: 'flex' }} source={require('../../image/pop/update_pop_bg.png')}>
                <View style={{ flex: 1 }}>
                    <Text style={{ marginTop: 65, color: 'white', marginLeft: 23 }}>1.0.1</Text>
                    <Text style={{ color: 'rgb(33,45,49)', fontSize: 14, marginTop: 60, alignSelf: 'center' }}>请更新版本以使用蝌蚪视频</Text>
                    <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                        <TouchableHighlight onPress={this._btnPress} style={{ height: 38, width: 196, marginBottom: 15, alignSelf: 'center', display: 'flex' }} underlayColor='transparent'>
                            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg.png')}>
                                <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即更新</Text>
                            </ImageBackground>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

class NewVersion extends PureComponent {
    static contextTypes = {
        toastNavigation: PropTypes.object
    }

    _btnPress = () => {
        Linking.openURL(this.props.url);
    }

    render() {
        return (
            <ImageBackground style={{ height: 276, width: 240, display: 'flex' }} source={require('../../image/pop/update_pop_bg.png')}>
                <View style={{ flex: 1 }}>
                    <Text style={{ marginTop: 65, color: 'white', marginLeft: 23 }}>1.0.1</Text>
                    <Text style={{ color: 'rgb(33,45,49)', fontSize: 14, marginTop: 60, alignSelf: 'center' }}>更新版本可获得更佳体验</Text>
                    <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                        <TouchableHighlight onPress={this._btnPress} style={{ height: 38, width: 196, marginBottom: 15, alignSelf: 'center', display: 'flex' }} underlayColor='transparent'>
                            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg.png')}>
                                <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即更新</Text>
                            </ImageBackground>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

class PayBusy extends PureComponent {
    static contextTypes = {
        toastNavigation: PropTypes.object
    }

    _btnPress = () => {
        const { toastNavigation } = this.context;
        Linking.openURL(Config.URL_REG.invite_link);
        toastNavigation.goBack();
    }

    render() {
        return (
            <View style={{ height: 216, width: 242, display: 'flex', backgroundColor: 'rgb(252,252,252)', alignItems: 'center', borderRadius: 6 }}>
                <Text style={{ fontSize: 18, color: 'rgb(34,34,34)', marginTop: 35, fontWeight: 'bold' }}>支付异常</Text>
                <Text style={{ fontSize: 14, marginTop: 30, color: 'rgb(71,71,71)' }}>支付系统繁忙,请在两分钟后再试</Text>
                <Text style={{ fontSize: 14, marginTop: 6, color: 'rgb(71,71,71)' }}>如有疑问前往蝌蚪交流群咨询管理</Text>
                <TouchableHighlight onPress={this._btnPress} style={{ height: 38, width: 196, marginTop: 30, display: 'flex' }} underlayColor='transparent'>
                    <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg.png')}>
                        <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即咨询</Text>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
        );
    }
}

class SeeHD extends PureComponent {
    static contextTypes = {
        toastNavigation: PropTypes.object
    }

    _btnPress = () => {
        const { toastNavigation } = this.context;
        toastNavigation.navigate('MemberCenterScreen');
    }

    render() {
        return (
            <View style={{ height: 216, width: 242, display: 'flex', backgroundColor: 'rgb(252,252,252)', alignItems: 'center', borderRadius: 6 }}>
                <Text style={{ fontSize: 18, color: 'rgb(34,34,34)', marginTop: 35, fontWeight: 'bold' }}>非会员看高清</Text>
                <Text style={{ fontSize: 14, marginTop: 30, color: 'rgb(71,71,71)' }}>会员专属影质</Text>
                <Text style={{ fontSize: 14, marginTop: 6, color: 'rgb(71,71,71)' }}>开通会员可享受,VIP高清通道</Text>
                <TouchableHighlight onPress={this._btnPress} style={{ height: 38, width: 196, marginTop: 30, display: 'flex' }} underlayColor='transparent'>
                    <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg.png')}>
                        <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即开通</Text>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
        );
    }
}

class NoTimes extends PureComponent {
    static contextTypes = {
        toastNavigation: PropTypes.object
    }

    _btnPress = () => {
        const { toastNavigation } = this.context;
        toastNavigation.navigate('MemberCenterScreen');
    }

    _task = () => {
        const { toastNavigation } = this.context;
        toastNavigation.navigate('TaskScreen');
    }

    render() {
        return (
            <View style={{ height: 216, width: 242, display: 'flex', backgroundColor: 'rgb(252,252,252)', alignItems: 'center', borderRadius: 6 }}>
                <Text style={{ fontSize: 18, color: 'rgb(34,34,34)', marginTop: 35, fontWeight: 'bold' }}>看片次数已用完</Text>
                <Text style={{ fontSize: 14, marginTop: 30, color: 'rgb(71,71,71)' }}>今日看片次数已用完</Text>
                <Text style={{ fontSize: 14, marginTop: 6, color: 'rgb(71,71,71)' }}><Text style={{ color: 'rgb(255,170,96)' }}>做任务</Text>/开通会员可享受无限看片</Text>
                <View style={{ height: 40, width: 242, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableHighlight onPress={this._task} style={{ height: 34, width: 94, marginTop: 30, display: 'flex' }} underlayColor='transparent'>
                        <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg_short.png')}>
                            <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>去做任务</Text>
                        </ImageBackground>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._btnPress} style={{ height: 34, width: 94, marginTop: 30, display: 'flex', marginLeft: 15 }} underlayColor='transparent'>
                        <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg_short.png')}>
                            <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即开通</Text>
                        </ImageBackground>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export default class ToastModel extends PureComponent {

    state = {
        pop: null,
        isShowBackBtn: true
    }

    static childContextTypes = {
        toastNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            toastNavigation: this.props.navigation
        }
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        const url = this.props.navigation.getParam('packageUrl', '');
        switch (type) {
            case 'SeeHD':
                this.setState({
                    pop: <SeeHD />,
                    isShowBackBtn: true
                });
                break;
            case 'NoTimes':
                this.setState({
                    pop: <NoTimes />,
                    isShowBackBtn: true
                });
                break;
            case 'PayBusy':
                this.setState({
                    pop: <PayBusy />,
                    isShowBackBtn: true
                });
                break;
            case 'NewVersion':
                this.setState({
                    pop: <NewVersion url={url} />,
                    isShowBackBtn: true
                });
                break;
            case 'NewVersionForce':
                this.setState({
                    pop: <NewVersionForce url={url} />,
                    isShowBackBtn: false
                });
                break;
        }
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                {Platform.OS === 'android' && < StatusBar translucent={true} />}
                {this.state.pop}
                {this.state.isShowBackBtn &&
                    <TouchableHighlight style={{ height: 31, width: 31, marginTop: 18 }} onPress={this._goBack} underlayColor='transparent'>
                        <Image style={{ height: 31, width: 31 }} source={require('../../image/task/model_close.png')} />
                    </TouchableHighlight>
                }
            </View>
        );
    }
}