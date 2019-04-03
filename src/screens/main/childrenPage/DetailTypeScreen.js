import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import * as Colors from '../../../global/Colors';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';
import TabBar from '../../../components/tabBar/SelectTab';
import VideoAvater from '../../../components/imageBtn/VideoAvater';

export default class DetailTypeScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: '',//nowGlobalType
        title: '',
        innerType: '',//nowInnerType
        sortType: '',
        globalTypeData: null,
        innerTypeData: null,
        sortTypeData: null,
        videoData: null,
        nowPage: -1,
        totalPage: -1,
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        const title = this.props.navigation.getParam('title', '');
        const innerType = this.props.navigation.getParam('innerType', '');
        this.setState({
            title: title,
            type: type,
            innerType: innerType
        });
        Api.getVideoTypeList((e) => {
            this.setState({
                globalTypeData: e.type,
                innerTypeData: e.type[0].children,
                sortTypeData: e.sort,
            });
            Api.getVideoTypeTrueList(type, innerType, e.sort[0].key, 1, 15, (innerE) => {
                console.log(innerE);
                this.setState({
                    videoData: innerE.list.data,
                    nowPage: innerE.list.current_page,
                    totalPage: innerE.list.last_page,
                });
            });
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _search = () => {
        this.props.navigation.navigate('SearchModel');
    }

    _globalChangeTab = (type) => {

        console.log('global');
        console.log(type);
    }

    _innerChangeTab = (type) => {
        console.log('inner');
        console.log(type);
    }

    _sortChangeTab = (type) => {
        console.log('sort');
        console.log(type);
    }

    _videoAvaterOnPress = (id) => {
        this.props.navigation.navigate('VideoModel', { videoId: id });
    }

    render() {
        let globalArr = this.state.globalTypeData ? this.state.globalTypeData.map((item) => { return item.name }) : [];
        let typeArr = this.state.innerTypeData ? this.state.innerTypeData.map((item) => { return item.title }) : [];
        let sortArr = this.state.sortTypeData ? this.state.sortTypeData.map((item) => { return item.name }) : [];
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader
                        goBack={this._goBack}
                        title={this.state.title}
                        rightBtnMode='icon'
                        rightBtnOnPress={this._search}
                        iconSource={require('../../../image/usual/search.png')} />
                    <TabBar tabNames={globalArr} tabTap={this._globalChangeTab} />
                    <TabBar tabNames={typeArr} tabTap={this._innerChangeTab} />
                    <TabBar tabNames={sortArr} tabTap={this._sortChangeTab} />
                    <View style={{ flex: 1 }}>
                        {this.state.videoData && this.state.videoData.length > 0 &&
                            <FlatList
                                style={{ flex: 1 }}
                                data={this.state.videoData}
                                contentContainerStyle={{ alignSelf: 'center' }}
                                columnWrapperStyle={{ marginTop: 20 }}
                                showsVerticalScrollIndicator={false}
                                numColumns={3}
                                renderItem={({ item }) => <VideoAvater isVertical={true} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                            />}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}