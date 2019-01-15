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
                <IdolTabList />
                <Text>SubjectScreen</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});