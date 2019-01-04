import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';
export default class MineScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    render() {
        return (
            <ImageBackground
                style={styles.imageBackground}
                source={require('../../image/mine/mine_background.png')}
            >
                <SafeAreaView style={styles.container}>

                </SafeAreaView>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: 207
    }
});