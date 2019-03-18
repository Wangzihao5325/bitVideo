import React, { Component } from 'react';
import { StatusBar, Platform, View, Image, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Provider } from 'react-redux';
import store from '../store/index';
import { get_device_account_info, get_user_info } from '../store/actions/accountAction';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { MainStack, ShortVideoStack, SubjectStack, TaskStack, MineStack } from '../app/register_screens';
import * as Colors from '../global/Colors';
import Api from '../socket/index';
import Variables from '../global/Variables';

import LoginModel from '../screens/loginModel/index';
import RegisterModal from '../screens/loginModel/register/index';
import RegisterStepTwoModal from '../screens/loginModel/register/RegisterStepTwo';
import LostPasswordModal from '../screens/loginModel/lostPassword/index';
import CountryCodeModal from '../screens/loginModel/countryCode/index';

import VideoModel from '../screens/videoModel/index';
import SearchModel from '../screens/searchModel/index';
import HistoryModel from '../screens/historyModel/index';
import CollectModel from '../screens/collectModel/index';

import SplashModel from '../components/splashModal/index';

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
    //TaskStack,
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
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
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




    //获取开屏动画
    Api.getSplashScreen((result, message, code) => {
      // console.log('123123123');
      // console.log(result);
      // console.log(message);
      // console.log(code);
      if (result) {
        this.setState({
          uri: result.ad_path
        });
      }
    });
    //设备号注册
    let deviceId = DeviceInfo.getUniqueID();
    Api.postRegisterByDeviceId(deviceId, (e) => {
      if (e && e.api_token) {
        Variables.account.token = e.api_token;
        Variables.account.deviceToken = e.api_token;
        store.dispatch(get_device_account_info(e));
        //获取个人信息
        Api.getUserInfo((e) => {
          if (e) {
            store.dispatch(get_user_info(e));
          }
        });
      }
    });

  }

  render() {
    return (
      <Provider store={store}>
        {Platform.OS === 'ios' && <StatusBar translucent={true} barStyle='light-content' />}
        <SplashModel source={{ uri: this.state.uri }} />
        <AppContainer />
      </Provider>
    );
  }
}