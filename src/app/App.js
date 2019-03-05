import React, { Component } from 'react';
import { StatusBar, View, Image, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Provider } from 'react-redux';
import store from '../store/index';
import { get_device_account_info, get_user_info } from '../store/actions/accountAction';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { MainStack, SubjectStack, TaskStack, MineStack } from '../app/register_screens';
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

import M3u8Download from '../socket/download';
import Video from 'react-native-video';
import RNFetchBlob from 'rn-fetch-blob';
const dirs = RNFetchBlob.fs.dirs;
let fullPath = dirs.DocumentDir + '/testFile/' + 'index.m3u8';
/*
const Router = createBottomTabNavigator(
  {
    MainStack,
    SubjectStack,
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
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

// const AppContainer = createAppContainer(Router);
const AppContainer = createAppContainer(RouterWithModal);
*/
export default class App extends Component {
  state = {
    uri: ''
  };

  componentDidMount() {
    //m3u8下载 demo
    // M3u8Download.download('https://t.bwzybf.com/2018/12/07/4uvPFAGxlZMdPiVL/playlist.m3u8', (state, rate) => {
    //   console.log('____________')
    //   console.log(state);
    //   console.log(rate);
    // });

    /*
    //获取开屏动画
    Api.getSplashScreen((result) => {
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
    */
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Provider store={store}>
        <StatusBar barStyle="default" />
        <SplashModel source={{ uri: this.state.uri }} />
        <AppContainer />
      </Provider> */}
        <Video
          source={{ uri: fullPath }}
          style={{ height: 200, width: 200, backgroundColor: 'black' }}
          controls={true}
        />
      </View>
    );
  }
}