import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import * as In18 from '../../global/In18';

import IdolTabList from './IdolTabList';
import HotSubject from './HotSubject';
import TopRecommendVideos from './TopRecommendVideos';

class TitleHeader extends PureComponent {
    show_more = () => {
        if (this.props.showMore) {
            this.props.showMore();
        }
    }
    render() {
        return (
            <View style={styles.titleHeaderContainer}>
                <Image style={styles.headerImage} source={this.props.imageSource} />
                <Text style={styles.headerText}>{this.props.title}</Text>
                <View style={styles.headerFlexView}>
                    <Text onPress={this.show_more} style={styles.more}>{this.props.btnTitle}</Text>
                </View>
            </View>
        );
    }
}
export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.SUBJECT_PAGE_TITLE,  //header标题
        }
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.titleText}>{In18.FAVOURITE_IDOL}</Text>
                <IdolTabList />
                <TitleHeader
                    imageSource={require('../../image/subject/hot_subject.png')}
                    title='热门专题'
                    btnTitle='更多'
                    showMore={() => { console.log('11223344') }} />
                <HotSubject />
                <TitleHeader
                    imageSource={require('../../image/subject/newest_movie.png')}
                    title='最新榜单专题推荐'
                    btnTitle='更多'
                    showMore={() => { console.log('11223344') }} />
                <TopRecommendVideos />
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
    },
    titleHeaderContainer: {
        height: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 20
    },
    headerImage: {
        height: 18,
        width: 18,
        marginLeft: 15
    },
    headerText: {
        fontSize: 18,
        color: 'rgb(54,54,54)',
        marginLeft: 6
    },
    headerFlexView: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    more: {
        marginRight: 38,
        fontSize: 14,
        color: 'rgb(120,120,120)'
    }
});