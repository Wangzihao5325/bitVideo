import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList, Share, Image, Text, NetInfo, TouchableHighlight, AsyncStorage, Platform, Clipboard } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Colors from '../../global/Colors';

import shortVideoList from '../../mock/shortVideoList';
import ShortVideoItem from './ShortVideoItem';

//restart
import store from '../../store/index';
import * as Config from '../../global/Config';
import DeviceInfo from 'react-native-device-info';
import NavigationService from '../../app/NavigationService';
import { lockReg, newReg, videoChanelReg } from '../../global/Reg';
import { set_lock } from '../../store/actions/lockAction';
import Variables from '../../global/Variables';
import { get_device_account_info, get_user_info } from '../../store/actions/accountAction';
import { change_net_state } from '../../store/actions/netAction';
import { setMainPageData, setPageInfo } from '../../store/actions/mainPageDataAction';

const reg = { typeMap2Id: {}, type: [] };
class ShortVideo extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    constructor(props) {
        super(props);

        this.showTime = true;
    }

    state = {
        shortVideoList: null,
        playingIndex: -1,
        nowPage: -1,
        lastPage: -1,
        lastUrl: '',
    };

    // componentDidMount() {
    //     Api.getShortVideoListById(10, 1, (e) => {
    //         if (e.data.length > 0) {
    //             this.setState({
    //                 shortVideoList: e.data,
    //                 playingIndex: -1,
    //                 nowPage: e.current_page,
    //                 lastPage: e.last_page,
    //                 lastUrl: e.last_page_url,
    //             });
    //         } else {
    //             //mock数据
    //             this.setState({
    //                 shortVideoList: shortVideoList
    //             });
    //         }
    //     });
    // }
    _flatListRefresh = () => {
        this.setState({
            playingIndex: -1
        });
        Api.getShortVideoListById(10, 1, (e) => {
            if (e.data.length > 0) {
                this.setState({
                    shortVideoList: e.data,
                    playingIndex: -1,
                    nowPage: e.current_page,
                    lastPage: e.last_page,
                    lastUrl: e.last_page_url,
                });
            } else {
                //mock数据
                this.setState({
                    shortVideoList: shortVideoList
                });
            }
        });
    }

    _getNextPageData = () => {
        if (this.state.nowPage !== this.state.lastPage) {
            this.setState({
                playingIndex: -1
            });
            Api.getShortVideoListById(10, this.state.nowPage + 1, (e) => {
                if (e.data.length > 0) {
                    this.setState((preState, props) => {
                        let newList = preState.shortVideoList.concat(e.data);
                        return {
                            shortVideoList: newList,
                            playingIndex: -1,
                            nowPage: e.current_page,
                            lastPage: e.last_page,
                            lastUrl: e.last_page_url,
                        }
                    });
                } else {
                    //mock数据
                    this.setState({
                        shortVideoList: shortVideoList
                    });
                }
            });
        }
    }

    _palyPress = (index) => {
        this.setState({
            playingIndex: index
        });
    }

    _willBlur = () => {
        this.setState({
            playingIndex: -1
        });
    }

    _onDidFocus = () => {
        if (this.showTime) {
            NavigationService.navigate('IndicatorScreen');
        }
        Api.getShortVideoListById(10, 1, (e) => {
            if (e.data.length > 0) {
                this.setState({
                    shortVideoList: e.data,
                    playingIndex: -1,
                    nowPage: e.current_page,
                    lastPage: e.last_page,
                    lastUrl: e.last_page_url,
                }, () => {
                    if (this.showTime) {
                        NavigationService.navigate('ShortVideoScreen');
                        this.showTime = false
                    }
                });
            } else {
                //mock数据
                this.setState({
                    shortVideoList: shortVideoList
                });
            }
        });
    }

    //进入短视频详情
    _toDetail = (url, id, title, times) => {
        this.props.navigation.navigate('ShortVideoDetail', { ShortVideoUrl: `${url}`, id: id, title: title, times: times });
    }

    //分享
    _goToInviteFriend = () => {
        Api.postShareQrCodeMessage(this.props.inviteCode, 'official', 'qrcode', (e) => {
            if (e.content) {
                let shareUrl = `${e.content.split(':')[1]}/share/${this.props.inviteCode}`;
                Share.share({
                    message: e.content,
                    url: shareUrl,
                    title: '蝌蚪视频App'
                }, {
                        dialogTitle: In18.SHARE_DIALOG_TITLE
                    })
                    .then(this._shareResult);
                // .catch((e) => { console.log(e) });
            }
        });
    }

    _shareResult = (result) => {
        if (result.action === Share.sharedAction) {
            // wait for other click
        }
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

                            //手势锁 广告页开启
                            if (store.getState().lock.isLock === 'true') {
                                NavigationService.navigate('GesturePasswordModel', { type: 'normal', times: 'first' });
                            } else {
                                NavigationService.navigate('AdModel');
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
                                let platformWords = Platform.OS === 'ios' ? 'I' : 'A';
                                let deviceId = DeviceInfo.getUniqueID();
                                Api.postRegisterByDeviceId(deviceId, clipboardContent, platformWords, (e, code, message) => {
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

                            //获取线路数据
                            Api.getVideoChannel((e) => {
                                let chanelDic = {};
                                let dropdownArr = [];
                                e.forEach((item) => {
                                    let title = item.title;
                                    let key = item.key;
                                    chanelDic[title] = key;
                                    dropdownArr.push(item.title);
                                });
                                videoChanelReg.mapArr = chanelDic;
                                videoChanelReg.data = dropdownArr;
                            });

                            //获取主页数据
                            Api.postGlobalTypeVideo('recommend', null, (e) => {
                                if (e.data) {
                                    store.dispatch(setMainPageData(e.data));
                                    store.dispatch(setPageInfo(e.current_page, e.last_page));
                                }
                            });

                            //获取短视频数据
                            Api.getShortVideoListById(10, 1, (e) => {
                                if (e.data.length > 0) {
                                    that.setState({
                                        shortVideoList: e.data,
                                        playingIndex: -1,
                                        nowPage: e.current_page,
                                        lastPage: e.last_page,
                                        lastUrl: e.last_page_url,
                                    });
                                } else {
                                    //mock数据
                                    that.setState({
                                        shortVideoList: shortVideoList
                                    });
                                }
                            });

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
                <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <NavigationEvents
                            onWillBlur={this._willBlur}
                            onDidFocus={this._onDidFocus}
                        />
                        <View style={{ flex: 1, marginTop: 10 }}>
                            {this.state.shortVideoList &&
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    onRefresh={this._flatListRefresh}
                                    refreshing={false}
                                    onEndReached={this._getNextPageData}
                                    onEndReachedThreshold={1}
                                    data={this.state.shortVideoList}
                                    extraData={this.state}
                                    renderItem={
                                        ({ item, index }) =>
                                            <ShortVideoItem
                                                share={this._goToInviteFriend}
                                                detail={this._toDetail}
                                                playPress={this._palyPress}
                                                nowPlaying={this.state.playingIndex}
                                                index={index}
                                                title={item.title}
                                                videoUrl={item.play_url}
                                                coverUrl={item.cover_path}
                                                playTimes={item.play_count}
                                                videoId={item.id}
                                            />
                                    }
                                />}
                        </View>
                    </SafeAreaView>
                </View>
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
        inviteCode: store.account.inviteCode,
        netSate: store.net.isConnection
    }
}

export default connect(mapState2Props)(ShortVideo);