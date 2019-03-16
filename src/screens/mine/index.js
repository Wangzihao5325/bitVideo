import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, SafeAreaView, Platform } from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from '../../global/Colors';
import { isXDevice } from '../../global/utils/PixelUtil';

import Header from './header';
import FunList from './funList';
//import History from './history';
import Bottom from './bottom';

export default class MineScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    static childContextTypes = {
        mineNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            mineNavigation: this.props.navigation
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
                <ImageBackground
                    style={bgImageStyle}
                    source={require('../../image/mine/mine_background.png')}
                >
                    <SafeAreaView style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <Header />
                            <FunList />
                            {/* <History /> */}
                            <Bottom />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});