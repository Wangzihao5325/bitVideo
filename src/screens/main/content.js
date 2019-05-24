import React, { PureComponent } from 'react';
import { ScrollView, View, Text, FlatList, Image, StyleSheet, TouchableHighlight, AsyncStorage, Clipboard, Platform, NetInfo } from 'react-native';
import PropTypes from 'prop-types';
import { setMainPageData, setPageInfo, addMainPageData } from '../../store/actions/mainPageDataAction';
import store from '../../store/index';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';
import Api from '../../socket/index';

import AdModule from '../../components/modules/ad';
import BannerModule from '../../components/modules/banner';
import VideoModule from '../../components/modules/video';
import GlobalTypeModule from '../../components/modules/globalType';
import VideoLong from '../../components/modules/video_long';

//restart
import * as Config from '../../global/Config';
import DeviceInfo from 'react-native-device-info';
import NavigationService from '../../app/NavigationService';
import { lockReg, newReg, videoChanelReg } from '../../global/Reg';
import { set_lock } from '../../store/actions/lockAction';
import Variables from '../../global/Variables';
import { get_device_account_info, get_user_info } from '../../store/actions/accountAction';
import { change_net_state } from '../../store/actions/netAction';



class Item extends PureComponent {

    static contextTypes = {
        mainNavigation: PropTypes.object
    }

    render() {
        const { mainNavigation } = this.context;
        switch (this.props.item.client_module) {//m_global_type
            case 'm_banner':
                if (this.props.item.m_banner_data && this.props.item.m_banner_data.length > 0) {//有可能会出现 arr.length=0 的情况
                    return (<BannerModule key={this.props.index} data={this.props.item.m_banner_data} navi={mainNavigation} />);
                }
            case 'm_video_type':
                if (this.props.item.m_video_type_data && this.props.item.m_video_type_data.length > 0) {
                    return (<GlobalTypeModule key={this.props.index} data={this.props.item.m_video_type_data} navi={mainNavigation} />);
                }
            case 'm_video':
                if (this.props.item.m_video_data && this.props.item.m_video_data.length > 0) {
                    return (<VideoModule moduleId={this.props.item.id} title={this.props.item.title} key={this.props.index} limit={this.props.item.client_limit} clientStyle={this.props.item.client_style} data={this.props.item.m_video_data} navi={mainNavigation} />);
                }
            case 'm_ad':
                if (this.props.item.m_ad_data && this.props.item.m_ad_data.length > 0) {
                    return (<AdModule key={this.props.index} data={this.props.item.m_ad_data[0]} navi={mainNavigation} />);
                }
            case 'm_video_long':
                if (this.props.item.m_video_long_data && this.props.item.m_video_long_data.length > 0) {
                    return (<VideoLong key={this.props.index} moduleId={this.props.item.id} title={this.props.item.title} limit={this.props.item.client_limit} data={this.props.item.m_video_long_data} navi={mainNavigation} />);
                }
            default:
                return (<View style={{ height: 1, width: Sizes.DEVICE_WIDTH, backgroundColor: 'transparent' }} />);
        }
    }
}

class Content extends PureComponent {
    _restartApp = () => {
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
                                newReg.mineIsNew = false;
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


                        })();
                    });
                });
            } else {

            }
        });
    }

    _flatListRefresh = () => {
        Api.postGlobalTypeVideo('recommend', null, (e) => {
            if (e.data) {
                store.dispatch(setMainPageData(e.data));
                store.dispatch(setPageInfo(e.current_page, e.last_page));
            }
        });
    }
    _getNextPageData = () => {
        if (this.props.nowPage >= this.props.totalPage) {
            return;
        }
        Api.postGlobalTypeVideo('recommend', this.props.nowPage + 1, (e, code, message) => {
            if (e.data) {
                store.dispatch(addMainPageData(e.data));
                store.dispatch(setPageInfo(e.current_page, e.last_page));
            }
        });
    }
    render() {
        if (this.props.netSate) {
            return (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.props.data}
                    renderItem={({ item, index }) => <Item item={item} index={index} />}
                    onRefresh={this._flatListRefresh}
                    refreshing={false}
                    onEndReached={this._getNextPageData}
                    onEndReachedThreshold={1}
                />
            );
        } else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
        data: store.mainPageData.data,
        totalPage: store.mainPageData.totalPage,
        nowPage: store.mainPageData.nowPage,
        netSate: store.net.isConnection
    }
}

export default connect(mapState2Props)(Content);

const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH
    }
});