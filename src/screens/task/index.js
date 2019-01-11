import React, { PureComponent } from 'react';
import { SafeAreaView, ImageBackground, ScrollView, View, Text, StyleSheet } from 'react-native';

import Header from './header';
import Middle from './middle';
import BottomTaskList from './bottomTaskList';

export default class TaskScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        return (
            <ScrollView
                style={{ height: 1136, width: '100%' }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../image/task/task_background.png')}
                >
                    <SafeAreaView style={styles.container}>
                        <Header />
                        <Middle />
                        <BottomTaskList />
                    </SafeAreaView>
                </ImageBackground>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    imageBackground: {
        width: '100%',
        height: 1136,//780
    }
});