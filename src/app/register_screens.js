import React from 'react';
import { createStackNavigator } from 'react-navigation';
import * as In18 from '../global/In18';
import { iconMake } from '../components/icons/Vector_icons';

import MainScreen from '../screens/main/index';
import ViewModuleMoreScreen from '../screens/main/childrenPage/ViewModuleMoreScreen';

import SubjectScreen from '../screens/subject/index';
import TaskScreen from '../screens/task/index';

import MineScreen from '../screens/mine/index';
import HelpScreen from '../screens/mine/help/index';

const TAB_ICON_KEY_STR = ['film', 'delicious', 'th-list', 'user'];
// 首页router
let MainStack = createStackNavigator(
    {
        MainScreen,
        ViewModuleMoreScreen,
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
        tabBarIcon: iconMake(TAB_ICON_KEY_STR[0]),
        tabBarVisible
    }
};

// 专题router
let SubjectStack = createStackNavigator(
    {
        SubjectScreen
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
        tabBarIcon: iconMake(TAB_ICON_KEY_STR[1]),
        tabBarVisible
    }
};

// 任务router
let TaskStack = createStackNavigator(
    {
        TaskScreen
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
        tabBarIcon: iconMake(TAB_ICON_KEY_STR[2]),
        tabBarVisible
    }
};

// 我的router
let MineStack = createStackNavigator(
    {
        MineScreen,
        HelpScreen
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
        tabBarIcon: iconMake(TAB_ICON_KEY_STR[3]),
        tabBarVisible
    }
};

export {
    MainStack,
    SubjectStack,
    TaskStack,
    MineStack,
};