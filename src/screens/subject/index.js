import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight, ScrollView, Image } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';
import PropTypes from 'prop-types';

import IdolTabList from './IdolTabList';
import TitleHeader from '../../components/titleHeader/index';
import HotSubject from './HotSubject';
import HotActor from './HotActor';

class Ad extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={{ width: 345, height: 150, backgroundColor: '#909090', marginTop: 20, alignSelf: 'center' }}>
                {/* <Image style={{}}/> */}
                <View style={{ flex: 1 }}></View>
            </TouchableHighlight>
        );
    }
}

export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    static childContextTypes = {
        subjectNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            subjectNavigation: this.props.navigation
        }
    }

    _goToMoreSubject = () => {
        this.props.navigation.navigate('MoreHotSubjectScreen');
    }

    _goToMoreActor = () => {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        {/* <Text style={styles.titleText}>{In18.HOT_TAG}</Text>
                        <IdolTabList /> */}
                        <Ad />
                        <TitleHeader
                            imageSource={require('../../image/subject/hot_subject.png')}
                            title={In18.HOT_SUBJECT}
                            btnTitle={In18.MORE_TEXT}
                            headerStyle={{ color: 'white', fontWeight: 'bold' }}
                            showMore={this._goToMoreSubject} />
                        <HotSubject />
                        <TitleHeader
                            style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgb(133,148,156)', marginTop: 0, height: 65 }}
                            imageSource={require('../../image/subject/hot_subject.png')}
                            title='人气演员'
                            btnTitle={In18.MORE_TEXT}
                            headerStyle={{ color: 'white', fontWeight: 'bold' }}
                            showMore={this._goToMoreActor} />
                        <HotActor />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: 18,
        marginBottom: 14,
        marginLeft: 15,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});