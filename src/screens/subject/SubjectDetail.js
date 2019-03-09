import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import * as In18 from '../../global/In18';

export default class SubjectDetailScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.SUBJECT_PAGE_DETAIL_TITLE,  //header标题
        }
    };

    componentDidMount() {
        const subjectId = this.props.navigation.getParam('subjectId', 'undefined_id');
        if (subjectId !== 'undefined_id') {
            console.log('12345');
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}></SafeAreaView>
        );
    }
}