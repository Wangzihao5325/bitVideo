import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import * as In18 from '../../global/In18';

export default class Header extends PureComponent {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTitle}>{In18.TASK_CENTER}</Text>
                <Image style={styles.image} source={require('../../image/mine/mine_defalut_avater.png')} />
                <Text style={styles.text}>{In18.START_TO_DO_TASK}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 13,
        height: 123,
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'white',
    },
    image: {
        height: 60,
        width: 60,
        marginTop: 16,
        borderRadius: 30,
    },
    text: {
        color: 'white',
        fontSize: 12,
        marginTop: 5
    }
});