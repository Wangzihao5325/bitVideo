import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableHighlight, ScrollView, Image } from 'react-native';
import * as In18 from '../../global/In18';
import * as Colors from '../../global/Colors';
import Api from '../../socket/index';
import PropTypes from 'prop-types';
// import * as Sizes from '../../global/Sizes';
// import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
//import IdolTabList from './IdolTabList';
import TitleHeader from '../../components/titleHeader/index';
import HotSubject from './HotSubject';
import HotActor from './HotActor';

class Ad extends PureComponent {
    static contextTypes = {
        subjectNavigation: PropTypes.object
    }

    state = {
        url: '',
        type: '',
        webUrl: '',
        videoId: ''
    }

    componentDidMount() {
        Api.getSubjectAd(1, 1, (e) => {
            if (e.data && e.data.length > 0) {
                let data = e.data.shift();
                if (data.type === 'VIDEO') {
                    this.setState({
                        url: data.cover_path,
                        type: data.type,
                        videoId: data.video_id
                    });
                } else {
                    this.setState({
                        url: data.cover_path,
                        type: data.type,
                        webUrl: data.redirect_url
                    });
                }
            }
        })
    }

    _onPress = () => {
        if (this.state.type === 'VIDEO') {
            const { subjectNavigation } = this.context;
            subjectNavigation.navigate('VideoModel', { videoId: this.state.videoId });
        }
    }

    render() {
        return (
            <TouchableHighlight onPress={this._onPress} style={{ width: 345, height: 150, marginTop: 20, alignSelf: 'center' }} underlayColor='transparent'>
                <View style={{ flex: 1 }}>
                    {this.state.length > 0 && <Image style={{ flex: 1 }} source={{ uri: this.state.url }} defaultSource={require('../../image/usual/banner_load_failed.png')} />}
                </View>
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

    _goToMoreActor = () => {//MoreHotActor
        this.props.navigation.navigate('MoreHotActor');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        {/* <Text style={styles.titleText}>{In18.HOT_TAG}</Text>
                        <IdolTabList /> */}
                        {/* <Ad /> */}
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