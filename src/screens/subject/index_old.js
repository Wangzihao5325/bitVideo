import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import * as In18 from '../../global/In18';

import IdolTabList from './IdolTabList';
import HotSubject from './HotSubject';
import TopRecommendVideos from './TopRecommendVideos';
import TitleHeader from '../../components/titleHeader/index';

export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.SUBJECT_PAGE_TITLE,  //header标题
        }
    };

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.titleText}>{In18.FAVOURITE_IDOL}</Text>
                <IdolTabList />
                <TitleHeader
                    imageSource={require('../../image/subject/hot_subject.png')}
                    title={In18.HOT_SUBJECT}
                    btnTitle={In18.MORE_TEXT}
                    showMore={() => {  }} />
                <HotSubject />
                <TitleHeader
                    imageSource={require('../../image/subject/newest_movie.png')}
                    title={In18.HOT_MOVIE}
                    btnTitle={In18.MORE_TEXT}
                    showMore={() => { }} />
                <TopRecommendVideos />
                <View style={{ height: 30, width: '100%' }} />
            </ScrollView>
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