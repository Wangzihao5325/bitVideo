import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import store from '../store/index';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { MainStack, SubjectStack, TaskStack, MineStack } from '../app/register_screens';
import * as Colors from '../global/Colors';

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

const AppContainer = createAppContainer(Router);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}