import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';

import ModalHeader from '../../../components/modal/ModalHeader';
import VideoAvater from '../../../components/imageBtn/VideoAvater';

export default class HotSubjectDetailScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: [],
        page: -1,
        totalPage: -1,
        id: '',
        title: ''
    };

    componentDidMount() {
        const title = this.props.navigation.getParam('title', '');
        const moduleId = this.props.navigation.getParam('moduleId', 'undefine_Id');
        this.setState({
            id: moduleId,
            title: title
        });
        Api.getNewSubjectDetail(moduleId, 1, 15, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data,
                    page: e.current_page,
                    totalPage: e.last_page
                });
            }
        });
    }

    _flatListRefresh = () => {
        Api.getNewSubjectDetail(this.state.id, 1, 15, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data,
                    page: e.current_page,
                    totalPage: e.last_page
                });
            }
        });
    }

    _getNextPageData = () => {
        if (this.state.page !== this.state.totalPage) {
            Api.getNewSubjectDetail(this.state.id, this.state.page + 1, 15, (e) => {
                if (Array.isArray(e.data)) {
                    this.setState((preState, props) => {
                        let newList = preState.data.concat(e.data);
                        return {
                            data: newList,
                            page: e.current_page,
                            totalPage: e.last_page
                        }
                    });
                }
            });
        }
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _videoAvaterOnPress = (id) => {
        this.props.navigation.navigate('VideoModel', { videoId: id });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} textStyle={{ color: Colors.NAVI_ACTIVE_TINT_COLOR }} backBtnColor={Colors.NAVI_ACTIVE_TINT_COLOR} title={this.state.title} rightBtnMode='none' />
                    {this.state.data.length > 0 &&
                        <FlatList
                            onRefresh={this._flatListRefresh}
                            refreshing={false}
                            onEndReached={this._getNextPageData}
                            onEndReachedThreshold={0.1}
                            data={this.state.data}
                            contentContainerStyle={{ alignSelf: 'center' }}
                            columnWrapperStyle={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            renderItem={({ item }) => <VideoAvater isVertical={true} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                        />}
                </SafeAreaView>
            </View>
        );
    }
}