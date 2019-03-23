import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import * as In18 from '../global/In18';
import { iconMake } from '../components/icons/Vector_icons';

import MainScreen from '../screens/main/index';
import ViewModuleMoreScreen from '../screens/main/childrenPage/ViewModuleMoreScreen';
import DetailTypeScreen from '../screens/main/childrenPage/DetailTypeScreen';

import ShortVideoScreen from '../screens/shortVideo/index';
import ShortVideoDetail from '../screens/shortVideo/shortVideoDetail/index';

import SubjectScreen from '../screens/subject/index';

import TaskScreen from '../screens/task/index';
import InviteListScreen from '../screens/task/inviteList/index';

import MineScreen from '../screens/mine/index';
import MemberCenterScreen from '../screens/mine/memberCenter/index';
import BugListScreen from '../screens/mine/memberCenter/BuyList';
import BuyCardPayScreen from '../screens/mine/memberCenter/BuyCardPay';
import HelpScreen from '../screens/mine/help/index';
import MessageScreen from '../screens/mine/message/index';
import MyMessageScreen from '../screens/mine/message/my/index';
import AppMessageScreen from '../screens/mine/message/app/index';
import SettingScreen from '../screens/mine/setting/index';

const TAB_ICON_KEY_STR = ['film', 'delicious', 'th-list', 'user'];
// 首页router
let MainStack = createStackNavigator(
    {
        MainScreen,
        ViewModuleMoreScreen,
        DetailTypeScreen,
    },
    {
        navigationOptions: { gesturesEnabled: false }
    }
);
MainStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: In18.MAIN_PAGE_TITLE,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../image/usual/main_focused.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../image/usual/main_unfocused.png')}
                />
            )
        },
        tabBarVisible
    }
};

// 热点（短视频）router
let ShortVideoStack = createStackNavigator(
    {
        ShortVideoScreen,
        ShortVideoDetail,
    },
    {
        navigationOptions: { gesturesEnabled: false }
    }
);
ShortVideoStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: In18.SHORT_VIDEO_TITLE,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../image/usual/short_focused.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../image/usual/short_unfocused.png')}
                />
            )
        },
        tabBarVisible
    }
};

// 专题router
let SubjectStack = createStackNavigator(
    {
        SubjectScreen,
    },
    {
        navigationOptions: { gesturesEnabled: false }
    }
);
SubjectStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: In18.SUBJECT_PAGE_TITLE,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../image/usual/subject_focused.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../image/usual/subject_unfocused.png')}
                />
            )
        },
        tabBarVisible
    }
};

// 任务router

let TaskStack = createStackNavigator(
    {
        TaskScreen,
        InviteListScreen
    },
    {
        navigationOptions: { gesturesEnabled: false }
    }
);
TaskStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: In18.TASK_PAGE_TITLE,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../image/usual/task_focused.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../image/usual/task_unfocused.png')}
                />
            )
        },
        tabBarVisible
    }
};

// 我的router //iconMake(TAB_ICON_KEY_STR[3])
let MineStack = createStackNavigator(
    {
        MineScreen,
        HelpScreen,
        MemberCenterScreen,
        BugListScreen,
        BuyCardPayScreen,
        MessageScreen,
        MyMessageScreen,
        AppMessageScreen,
        SettingScreen
    },
    {
        navigationOptions: { gesturesEnabled: false }
    }
);
MineStack.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }
    return {
        tabBarLabel: In18.MINE_PAGE_TITLE,
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image
                        style={{ height: 24, width: 24 }}
                        resizeMode='contain'
                        source={require('../image/usual/mine_focused.png')}
                    />
                );
            }
            return (
                <Image
                    style={{ height: 24, width: 24 }}
                    resizeMode='contain'
                    source={require('../image/usual/mine_unfocused.png')}
                />
            )
        },
        tabBarVisible
    }
};

export {
    MainStack,
    ShortVideoStack,
    SubjectStack,
    TaskStack,
    MineStack,
};