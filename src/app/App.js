import React, { Component } from 'react';
import { StatusBar } from 'react-native';
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

export default class App extends Component {
  componentDidMount() {
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
        <StatusBar barStyle="default" />
        <AppContainer />
      </Provider>
    );
  }
}