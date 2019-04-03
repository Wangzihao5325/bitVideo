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
        type: '',//nowGlobalType
        title: '',
        innerType: '',//nowInnerType
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
        Api.getVideoTypeList(type, innerType, 'created_at', 1, 12, (e) => {
            this.setState({
                globalTypeData: e.global,
                innerTypeData: e.type,
                sortTypeData: e.sort,
                videoData: e.list.data,
                nowPage: e.list.current_page,
                totalPage: e.list.last_page,
            });
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
                    <TabBar tabNames={globalArr} tabTap={this._changeTab} />
                    <TabBar tabNames={typeArr} tabTap={this._changeTab} />
                    <TabBar tabNames={sortArr} tabTap={this._changeTab} />
                </View>
            </SafeAreaView>
        );
    }
}