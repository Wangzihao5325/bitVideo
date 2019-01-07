import React, { PureComponent } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as In18 from '../../global/In18';

import VectorIconBtn from '../../components/imageBtn/VectorIconBtn';

class Header extends PureComponent {
    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.headerFlexContainer}>
                    <VectorIconBtn size={21} name='chevron-left' color='rgb(73,114,255)' onPress={this.props.goBack} />
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{In18.PASSWORD_LOGIN}</Text>
                </View>
                <TouchableHighlight style={[styles.headerFlexContainer, { justifyContent: 'center' }]}>
                    <Text style={styles.headerRegister}>{In18.REGISTER}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
export default class LoginModel extends PureComponent {
    render() {
        return (
            <SafeAreaView>
                <Header goBack={() => this.props.navigation.goBack()} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 13,
        height: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    headerFlexContainer: {
        height: 25,
        width: 35,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'rgb(32,32,32)'
    },
    headerRegister: {
        color: 'rgb(32,32,32)',
        fontSize: 18
    }
});