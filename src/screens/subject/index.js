import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight, ScrollView, Image, AsyncStorage, Platform, Clipboard, NetInfo } from 'react-native';
import * as In18 from '../../global/In18';
import * as Colors from '../../global/Colors';
import Api from '../../socket/index';
import PropTypes from 'prop-types';
// import * as Sizes from '../../global/Sizes';
// import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
//import IdolTabList from './IdolTabList';
import TitleHeader from '../../components/titleHeader/index';
import HotSubject from './HotSubject';
import HotActor from './HotActor';
import { naviToVideoService } from '../../screens/videoModel/VideoService';
import { connect } from 'react-redux';

//restart
import store from '../../store/index';
import * as Config from '../../global/Config';
import DeviceInfo from 'react-native-device-info';
import NavigationService from '../../app/NavigationService';
import { lockReg, newReg } from '../../global/Reg';
import { set_lock } from '../../store/actions/lockAction';
import Variables from '../../global/Variables';
import { get_device_account_info, get_user_info } from '../../store/actions/accountAction';
import { change_net_state } from '../../store/actions/netAction';
import { setMainPageData, setPageInfo } from '../../store/actions/mainPageDataAction';


class Ad extends PureComponent {
    static contextTypes = {
        subjectNavigation: PropTypes.object
    }

    state = {
        url: '',
        type: '',
        webUrl: '',
        videoId: ''
    }

    componentDidMount() {
        Api.getSubjectAd(1, 1, (e) => {
            if (e.data && e.data.length > 0) {
                let data = e.data.shift();
                if (data.type === 'VIDEO') {
                    this.setState({
                        url: data.cover_path,
                        type: data.type,
                        videoId: data.video_id
                    });
                } else {
                    this.setState({
                        url: data.cover_path,
                        type: data.type,
                        webUrl: data.redirect_url
                    });
                }
            }
        })
    }

    _onPress = () => {
        if (this.state.type === 'VIDEO') {
            const { subjectNavigation } = this.context;
            subjectNavigation.navigate('VideoModel', { videoId: this.state.videoId });
            //naviToVideoService(this.state.videoId);


        }
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress} style={{ width: 345, height: 150, marginTop: 20, alignSelf: 'center' }} underlayColor='transparent'>
                <View style={{ flex: 1 }}>
                    {this.state.length > 0 && <Image style={{ flex: 1 }} source={{ uri: this.state.url }} defaultSource={require('../../image/usual/banner_load_failed.png')} />}
                </View>
            </TouchableHighlight>
        );
    }
}

class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    static childContextTypes = {
        subjectNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            subjectNavigation: this.props.navigation
        }
    }

    _goToMoreSubject = () => {
        this.props.navigation.navigate('MoreHotSubjectScreen');
    }

    _goToMoreActor = () => {//MoreHotActor
        this.props.navigation.navigate('MoreHotActor');
    }

    _restartApp = () => {
        let that = this;
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                store.dispatch(change_net_state(true));
                Api.getDomain((outerE) => {
                    Config.SERVICE_URL.domainUrl = `http://${outerE}`;
                    let PlatformKey = 'I';
                    if (Platform.OS === 'android') {
                        PlatformKey = 'A';
                    }
                    Api.getVersionMessage(PlatformKey, (e, code, message) => {
                        Config.URL_REG.official_url = e.official_url;
                        Config.URL_REG.invite_link = e.potato_invite_link;
                        Config.URL_REG.shareUrl = e.share_url;
                        let AppVersion = DeviceInfo.getVersion();
                        if (AppVersion !== e.version_code) {
                            if (e.force) {
                                //强制更新
                                NavigationService.navigate('ToastModel', { type: 'NewVersionForce', packageUrl: e.package_path });
                                return;
                            } else {
                                //非强制更新
                                NavigationService.navigate('ToastModel', { type: 'NewVersion', packageUrl: e.package_path });
                            }
                        }
                        (async function () {
                            let password = await AsyncStorage.getItem('Lock_Password');
                            let islock = await AsyncStorage.getItem('Lock_Islock');
                            let userToken = await AsyncStorage.getItem('User_Token');
                            let clipboardContent = await Clipboard.getString();
                            if (userToken) {
                                newReg.isNew = false;
                            }

                            if (password) {
                                lockReg.password = password;
                            }
                            if (islock) {
                                store.dispatch(set_lock(islock));
                                // lockReg.isLock = islock;
                            }

                            //设备号注册 获取用户信息
                            if (userToken) {
                                Variables.account.token = userToken;
                                Variables.account.deviceToken = userToken;
                                Api.getUserInfo((e, code, message) => {
                                    if (e) {
                                        store.dispatch(get_user_info(e));
                                    }
                                });
                            } else {
                                let deviceId = DeviceInfo.getUniqueID();
                                Api.postRegisterByDeviceId(deviceId, clipboardContent, (e, code, message) => {
                                    if (e && e.api_token) {
                                        AsyncStorage.setItem('User_Token', e.api_token);
                                        Variables.account.token = e.api_token;
                                        Variables.account.deviceToken = e.api_token;
                                        store.dispatch(get_device_account_info(e));
                                        Api.getUserInfo((e, code, message) => {
                                            if (e) {
                                                store.dispatch(get_user_info(e));
                                            }
                                        });
                                    }
                                });
                            }

                            //获取主页数据
                            Api.postGlobalTypeVideo('recommend', null, (e) => {
                                if (e.data) {
                                    store.dispatch(setMainPageData(e.data));
                                    store.dispatch(setPageInfo(e.current_page, e.last_page));
                                }
                            });

                            //手势锁 广告页开启
                            if (store.getState().lock.isLock === 'true') {
                                NavigationService.navigate('GesturePasswordModel', { type: 'normal', times: 'first' });
                            } else {
                                NavigationService.navigate('AdModel');
                            }

                        })();
                    });
                });
            } else {

            }
        });
    }

    render() {
        if (this.props.netSate) {
            return (
                <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                    <View style={{ flex: 1 }}>
                        <ScrollView>
                            {/* <Text style={styles.titleText}>{In18.HOT_TAG}</Text>
                        <IdolTabList /> */}
                            {/* <Ad /> */}
                            <TitleHeader
                                imageSource={require('../../image/subject/hot_subject.png')}
                                title={In18.HOT_SUBJECT}
                                btnTitle={In18.MORE_TEXT}
                                headerStyle={{ color: 'white', fontWeight: 'bold' }}
                                showMore={this._goToMoreSubject} />
                            <HotSubject />
                            <TitleHeader
                                style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgb(133,148,156)', marginTop: 0, height: 65 }}
                                imageSource={require('../../image/subject/hot_subject.png')}
                                title='人气演员'
                                btnTitle={In18.MORE_TEXT}
                                headerStyle={{ color: 'white', fontWeight: 'bold' }}
                                showMore={this._goToMoreActor} />
                            <HotActor />
                        </ScrollView>
                    </View>
                </SafeAreaView>
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.SCREEN_BGCOLOR }}>
                    <Image style={{ height: 97, width: 71 }} source={require('../../image/usual/no_net.png')} />
                    <Text style={{ fontSize: 14, color: 'rgb(167,167,167)', marginTop: 15 }}>页面内容加载失败</Text>
                    <TouchableHighlight
                        style={{ height: 27, width: 70, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(79,86,90)', marginTop: 26, borderRadius: 5 }}
                        underlayColor='transparent'
                        onPress={this._restartApp}
                    >
                        <Text style={{ color: 'white', fontSize: 14 }}>点击刷新</Text>
                    </TouchableHighlight>
                </View>
            );
        }
    }
}

function mapState2Props(store) {
    return {
        netSate: store.net.isConnection
    }
}

export default connect(mapState2Props)(SubjectScreen);

const styles = StyleSheet.create({
    titleText: {
        marginTop: 18,
        marginBottom: 14,
        marginLeft: 15,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});