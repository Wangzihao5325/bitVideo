import React, { Component } from 'react';
import { StatusBar, Platform, AsyncStorage, AppState, Clipboard } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Provider } from 'react-redux';
import store from '../store/index';
import { set_lock } from '../store/actions/lockAction';
import { get_device_account_info, get_user_info } from '../store/actions/accountAction';
import { setMainPageData, setPageInfo } from '../store/actions/mainPageDataAction';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import NavigationService from './NavigationService';
import { MainStack, ShortVideoStack, SubjectStack, TaskStack, MineStack } from '../app/register_screens';
import * as Colors from '../global/Colors';
import Api from '../socket/index';
import Variables from '../global/Variables';
import { lockReg, newReg } from '../global/Reg';
import * as Config from '../global/Config';

import LoginModel from '../screens/loginModel/index';
import RegisterModal from '../screens/loginModel/register/index';
import RegisterStepTwoModal from '../screens/loginModel/register/RegisterStepTwo';
import LostPasswordModal from '../screens/loginModel/lostPassword/index';
import CountryCodeModal from '../screens/loginModel/countryCode/index';

import VideoModel from '../screens/videoModel/index';
import SearchModel from '../screens/searchModel/index';
import HistoryModel from '../screens/historyModel/index';
import CollectModel from '../screens/collectModel/index';
import IconsListModel from '../screens/task/coinModel/index';
import GiftCenterModel from '../screens/task/giftCenterModel/index';
import QrCodeModel from '../screens/task/qrCode/index';
import GesturePasswordModel from '../screens/gesturePassword/index';
import SetGesturePasswordModel from '../screens/gesturePassword/SetPassword';
import BindPhoneModel from '../screens/loginModel/BindPhone';
import AdModel from '../screens/adModel/index';
import ToastModel from '../screens/toastModel/index';

import SplashModel from '../components/splashModal/index';
import SplashScreen from 'react-native-splash-screen';

// import M3u8Download from '../socket/download';
// import Video from 'react-native-video';
// import StaticServer from 'react-native-static-server';
// import RNFetchBlob from 'rn-fetch-blob';
// const dirs = RNFetchBlob.fs.dirs;
// let fullPath = dirs.DocumentDir;

const Router = createBottomTabNavigator(
  {
    MainStack,
    SubjectStack,
    ShortVideoStack,
    TaskStack,
    MineStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.NAVI_ACTIVE_TINT_COLOR,
      style: {
        backgroundColor: Colors.NAVI_BGCOLOR,
      }
    }
  }
);

const RouterWithModal = createStackNavigator(
  {
    Main: {
      screen: Router
    },
    MyModel: {
      screen: LoginModel
    },
    MyRegisterModal: {
      screen: RegisterModal
    },
    RegisterStepTwoModal: {
      screen: RegisterStepTwoModal
    },
    LostPasswordModal: {
      screen: LostPasswordModal
    },
    CountryCodeModal: {
      screen: CountryCodeModal
    },
    VideoModel: {
      screen: VideoModel
    },
    SearchModel: {
      screen: SearchModel
    },
    HistoryModel: {
      screen: HistoryModel
    },
    CollectModel: {
      screen: CollectModel
    },
    IconsListModel: {
      screen: IconsListModel
    },
    GiftCenterModel: {
      screen: GiftCenterModel
    },
    QrCodeModel: {
      screen: QrCodeModel
    },
    GesturePasswordModel: {
      screen: GesturePasswordModel
    },
    SetGesturePasswordModel: {
      screen: SetGesturePasswordModel
    },
    BindPhoneModel: {
      screen: BindPhoneModel
    },
    AdModel: {
      screen: AdModel
    },
    ToastModel: {
      screen: ToastModel
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
    transparentCard: true,
    cardStyle: {
      // makes transparentCard work for android
      opacity: 1.0
    },
  }
);

// const AppContainer = createAppContainer(Router);
const AppContainer = createAppContainer(RouterWithModal);

export default class App extends Component {
  state = {
    uri: ''
  };

  componentDidMount() {
    //static server demo
    // console.log(fullPath);
    // let localM3u8Path = fullPath + '/testDoc';
    // let server = new StaticServer(8080, localM3u8Path);

    // // Start the server
    // server.start().then((url) => {
    //   console.log("Serving at URL", url);
    //   this.setState({
    //     localUrl: url + '/index.m3u8'
    //   });
    // });


    //m3u8下载 demo
    // console.log(fullPath);
    // M3u8Download.download('https://t.bwzybf.com/2018/12/07/4uvPFAGxlZMdPiVL/playlist.m3u8', 'testDoc', (state, rate) => {
    //   console.log('____________')
    //   console.log(state);
    //   console.log(rate);
    // });
    SplashScreen.hide();
    Api.getDomain((e) => {
      Config.SERVICE_URL.domainUrl = `http://${e}`;
      let PlatformKey = 'I';
      if (Platform.OS === 'android') {
        PlatformKey = 'A';
      }
      Api.getVersionMessage(PlatformKey, (e, code, message) => {
        Config.URL_REG.official_url = e.official_url;
        Config.URL_REG.invite_link = e.potato_invite_link;
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

    AppState.addEventListener('change', (appState) => {
      if (appState === 'active') {
        if (store.getState().lock.isLock === 'true') {
          let nowRouter = NavigationService.nowRouter();
          if (nowRouter === 'GesturePasswordModel') {
            //do nothing
          } else {
            NavigationService.navigate('GesturePasswordModel', { type: 'normal', times: 'first' });
          }
        }
      }

    });
  }

  render() {
    return (
      <Provider store={store}>
        {Platform.OS === 'ios' && <StatusBar translucent={true} barStyle='light-content' />}
        {Platform.OS === 'android' && <StatusBar backgroundColor={Colors.SCREEN_BGCOLOR} />}
        {/* <SplashModel source={{ uri: this.state.uri }} /> */}
        <AppContainer ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }} />
      </Provider>
    );
  }
}