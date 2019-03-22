import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight, Image } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';

import IdolTabList from './IdolTabList';
import TitleHeader from '../../components/titleHeader/index';
import HotSubject from './HotSubject';

class Ad extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={{ width: 345, height: 150, backgroundColor: '#909090', marginTop: 20,alignSelf:'center' }}>
                {/* <Image style={{}}/> */}
                <View style={{flex:1}}></View>
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

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>{In18.HOT_TAG}</Text>
                    <IdolTabList />
                    <Ad />
                    <TitleHeader
                        imageSource={require('../../image/subject/hot_subject.png')}
                        title={In18.HOT_SUBJECT}
                        btnTitle={In18.MORE_TEXT}
                        showMore={() => { console.log('11223344') }} />
                    <HotSubject />
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