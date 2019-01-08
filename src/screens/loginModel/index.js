import React, { PureComponent } from 'react';
import { SafeAreaView, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import * as In18 from '../../global/In18';

import VectorIconBtn from '../../components/imageBtn/VectorIconBtn';
import MobileInput from '../../components/input/MobileInput';
import PasswordInput from '../../components/input/PasswordInput';

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

class MainTitle extends PureComponent {
    render() {
        return (
            <View style={styles.mainTitleContainer}>
                <View style={styles.mainTitleH1}>
                    <Text style={styles.H1Text}>{In18.WELCOME_BACK}</Text>
                </View>
                <View style={styles.mainTitleH2}>
                    <Text style={styles.H2Text}>{In18.SIGN_IN_TO_CONTAINE}</Text>
                </View>
            </View>
        );
    }
}
class InputField extends PureComponent {
    render() {
        return (
            <View style={styles.inputFieldContainer}>
                <MobileInput />
                <PasswordInput style={{ marginTop: 30 }} />
            </View>
        );
    }
}
export default class LoginModel extends PureComponent {
    render() {
        return (
            <SafeAreaView>
                <Header goBack={() => this.props.navigation.goBack()} />
                <MainTitle />
                <InputField />
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
    },
    mainTitleContainer: {
        height: 72,
        width: '100%',
        marginTop: 80,
        display: 'flex'
    },
    mainTitleH1: {
        flex: 1,
        height: 33,
        marginLeft: 30,
        justifyContent: 'center'
    },
    H1Text: {
        color: 'rgb(32,32,32)',
        fontSize: 24
    },
    mainTitleH2: {
        flex: 1,
        height: 22,
        marginLeft: 34,
        justifyContent: 'center'
    },
    H2Text: {
        color: 'rgb(151,151,151)',
        fontSize: 16
    },
    inputFieldContainer: {
        height: 200,
        width: '100%',
        marginTop: 58
    }
});