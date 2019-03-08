import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import * as In18 from '../../global/In18';
import Api from '../../socket/index';

export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.SUBJECT_PAGE_TITLE,  //header标题
        }
    };

    componentDidMount() {
        Api.getNewSubjectList(1, 10, (e, message, code) => {
            console.log(e);
            console.log(message);
            console.log(code);
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 1500,
        display: 'flex',
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