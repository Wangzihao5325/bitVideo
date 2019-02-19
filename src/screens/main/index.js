import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from '../../global/Colors';

import Header from './header';
import Content from './content';

export default class MainScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    static childContextTypes = {
        mainNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            mainNavigation: this.props.navigation
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Header />
                    <Content />
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.SAFE_AREA_BGCOLOR
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});