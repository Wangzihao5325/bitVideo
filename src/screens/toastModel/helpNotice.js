import React, { PureComponent } from 'react';
import { View, Text, TouchableHighlight, ImageBackground, Image, StatusBar, Platform, ScrollView, Linking, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import * as Config from '../../global/Config';

class HelpNoticeTab extends PureComponent {
    static contextTypes = {
        noticeNavigation: PropTypes.object
    }

    _btnPress = () => {
        Linking.openURL(this.props.url);
    }

    render() {
        return (
            <View style={{ height: 352, width: 277, display: 'flex', backgroundColor: 'rgb(252,252,252)', alignItems: 'center', borderRadius: 6 }}>
                <Text style={{ fontSize: 23, color: 'rgb(34,34,34)', marginTop: 19, fontWeight: 'bold' }}>安全提示</Text>
                <View style={{ marginTop: 15, height: 1, width: 237, backgroundColor: 'rgb(224,224,224)' }} />
                <ScrollView style={{ flex: 1, marginTop: 28, width: 237 }}>
                    <Text style={{ fontSize: 15 }}>{this.props.text}</Text>
                </ScrollView>
                <TouchableHighlight onPress={this._btnPress} style={{ height: 38, width: 196, marginTop: 30, marginBottom: 25, display: 'flex' }} underlayColor='transparent'>
                    <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={require('../../image/pop/pop_btn_bg.png')}>
                        <Text style={{ color: 'rgb(33,45,49)', fontSize: 14 }}>立即安装</Text>
                    </ImageBackground>
                </TouchableHighlight>
            </View>
        );
    }
}

export default class HelpNoticeModel extends PureComponent {

    state = {
        pop: null,
        isShowBackBtn: true
    }

    static childContextTypes = {
        noticeNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            noticeNavigation: this.props.navigation
        }
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        const url = this.props.navigation.getParam('url', '');
        const text = '近期苹果大量封杀成人视频，请务必安装修复文件，以便您能随时找回蝌蚪！';
        switch (type) {
            case 'Notice':
                this.setState({
                    pop: <HelpNoticeTab text={text} url={url} />,
                    isShowBackBtn: true
                });
                break;
        }
    }

    componentWillUnmount() {
        if (this.backHandler) {
            this.backHandler.remove();
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