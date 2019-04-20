import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import { naviToVideoService } from '../../../screens/videoModel/VideoService';


import VideoAvater from '../../../components/imageBtn/VideoAvater';
import ModalHeader from '../../../components/modal/ModalHeader';

export default class ViewModuleMoreScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: [],
        title: '',
        moduleId: -1,
        page: -1,
        totalPage: -1,
    };

    componentDidMount() {
        const moduleId = this.props.navigation.getParam('moduleId', 'undefine_Id');
        const title = this.props.navigation.getParam('title', 'undefine_Id');
        this.setState({
            title: title,
            moduleId: moduleId
        });
        Api.getViewModuleMore(moduleId, 1, 14, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data,
                    page: e.current_page,
                    totalPage: e.current_page + 1,
                });
            }
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _videoAvaterOnPress = (id) => {
        this.props.navigation.navigate('VideoModel', { videoId: id });
        //naviToVideoService(id);
    }

    _goBack = () => {
        this.props.navigation.goBack();
    }

    _flatListRefresh = () => {
        Api.getViewModuleMore(this.state.moduleId, 1, 14, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data,
                    page: e.current_page,
                });
            }
        })
    }

    _getNextPageData = () => {
        if (this.state.page !== this.state.totalPage) {
            Api.getViewModuleMore(this.state.moduleId, this.state.page + 1, 14, (e) => {
                if (Array.isArray(e.data)) {
                    if (e.data.length > 0) {
                        this.setState((preState, props) => {
                            let newList = preState.data.concat(e.data);
                            return {
                                data: newList,
                                page: e.current_page,
                                totalPage: e.current_page + 1,
                            }
                        });
                    } else {
                        this.setState((preState, props) => {
                            return {
                                totalPage: preState.page
                            }
                        });
                    }
                }
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} titleStyle={{ color: 'rgb(255,168,96)' }} backBtnColor='rgb(255,255,255)' title={this.state.title} rightBtnMode='none' />
                    {this.state.data.length > 0 &&
                        <FlatList
                            style={{ alignSelf: 'center', width: '100%' }}
                            onRefresh={this._flatListRefresh}
                            refreshing={false}
                            onEndReached={this._getNextPageData}
                            onEndReachedThreshold={1}
                            data={this.state.data}
                            columnWrapperStyle={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            renderItem={({ item }) => <VideoAvater isVertical={false} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                        />}
                </SafeAreaView>
            </View>
        );
    }
}