import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import * as Colors from '../../../global/Colors';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';
import TabBar from '../../../components/tabBar/SelectTab';



export default class DetailTypeScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: '',
        title: '',
        typeData: null,
        videoData: null
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        const title = this.props.navigation.getParam('title', '');
        this.setState({
            title: title,
            type: type
        });
        Api.getTypeArrsByGlobalType(type, (e) => {

        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _search = () => {
        this.props.navigation.navigate('SearchModel');
    }

    _changeTab = (type) => {

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader
                        goBack={this._goBack}
                        title={this.state.title}
                        rightBtnMode='icon'
                        rightBtnOnPress={this._search}
                        iconSource={require('../../../image/usual/search.png')} />
                    <TabBar tabNames={['日本', 'AV', '港台电影', '国产']} tabTap={this._changeTab} />
                    <TabBar tabNames={['全部类型', '无码', '内衣', '偷拍']} tabTap={this._changeTab} />
                    <TabBar tabNames={['最近播放', '最新更新', '港台电影', '最多喜欢']} tabTap={this._changeTab} />
                </View>
            </SafeAreaView>
        );
    }
}