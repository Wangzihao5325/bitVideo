import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as In18 from '../../global/In18';

import IdolTabList from './IdolTabList';

export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.SUBJECT_PAGE_TITLE,  //header标题
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>{In18.FAVOURITE_IDOL}</Text>
                <IdolTabList />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    titleText: {
        marginTop: 18,
        marginBottom: 14,
        marginLeft: 15,
        color: 'rgb(54,54,54)',
        fontSize: 18,
        fontWeight: 'bold'
    }
});