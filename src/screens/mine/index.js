import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import * as Colors from '../../global/Colors';
import { isXDevice } from '../../global/utils/PixelUtil';

import Header from './header';
import FunList from './funList';
import History from './history';
import Bottom from './bottom';

export default class MineScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        statusBarColor: Colors.SCREEN_BGCOLOR
    }

    static childContextTypes = {
        mineNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            mineNavigation: this.props.navigation
        }
    }

    _willFocus = () => {
        if (Platform.OS === 'android') {
            this.setState({
                statusBarColor: 'rgb(17,23,27)'
            });
        }
    }

    _willBlur = () => {
        if (Platform.OS === 'android') {
            this.setState({
                statusBarColor: Colors.SCREEN_BGCOLOR
            });
        }
    }

    render() {
        let isX = isXDevice();
        let bgImageStyle = { width: '100%', height: 207 - 20 };
        if (isX) {
            bgImageStyle = { width: '100%', height: 207 };
        }
        if (Platform.OS === 'android') {
            bgImageStyle = { width: '100%', height: 207 - 44 };
        }
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <Image
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }, bgImageStyle]}
                    source={require('../../image/mine/mine_background.png')}
                />
                <SafeAreaView style={styles.container}>
                    <NavigationEvents
                        onWillFocus={this._willFocus}
                        onWillBlur={this._willBlur}
                    />
                    {Platform.OS === 'android' && <StatusBar backgroundColor={this.state.statusBarColor} />}
                    <Header />
                    <FunList />
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <History />
                        <Bottom />
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});