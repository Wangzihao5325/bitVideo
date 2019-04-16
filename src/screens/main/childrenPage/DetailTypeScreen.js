import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import * as Colors from '../../../global/Colors';
import Api from '../../../socket/index';
import { naviToVideoService } from '../../../screens/videoModel/VideoService';


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
            let globalTypeIndex = 0;
            let innerTypeData = e.type[0].children;
            e.type.every((item, index) => {
                if (item.key == type) {
                    globalTypeIndex = index;
                    innerTypeData = item.children;
                    return false;
                } else {
                    return true
                }
            });

            let innerTypeIndex = 0;
            innerTypeData.every((item, index) => {
                if (item.id == innerType) {
                    innerTypeIndex = index;
                    return false;
                } else {
                    return true;
                }
            });

            this.setState({
                globalTypeData: e.type,
                innerTypeData: innerTypeData,
                sortTypeData: e.sort,
                sortType: e.sort[0].key
            }, () => {
                this.globalType.reset(globalTypeIndex);
                this.innerType.reset(innerTypeIndex);
            });

            Api.getVideoTypeTrueList(type, innerType, e.sort[0].key, 1, 14, (innerE) => {
                //console.log(innerE);
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
        let innerTypeData = this.state.globalTypeData[0].children;
        let nowGlobalType = '';
        this.state.globalTypeData.every((item, index) => {
            if (item.name == type) {
                innerTypeData = item.children;
                nowGlobalType = item.key;
                return false;
            } else {
                return true;
            }
        });


        let innerIndex = 0;
        let nowInnerType = innerTypeData[0].id;
        innerTypeData.every((item, index) => {
            if (item.id = this.state.innerType) {
                innerIndex = index;
                nowInnerType = item.id
                return false;
            } else {
                return true;
            }
        });

        this.setState({
            type: nowGlobalType,
            innerType: nowInnerType,
            innerTypeData: innerTypeData
        }, () => {
            this.innerType.reset(innerIndex);
            Api.getVideoTypeTrueList(this.state.type, this.state.innerType, this.state.sortType, 1, 14, (innerE) => {
                this.setState({
                    videoData: innerE.list.data,
                    nowPage: innerE.list.current_page,
                    totalPage: innerE.list.last_page,
                });
            });
        });
    }

    _innerChangeTab = (type) => {
        let nowId = this.state.innerTypeData[0].id;
        this.state.innerTypeData.every((item, index) => {
            if (item.title == type) {
                nowId = item.id;
                return false;
            } else {
                return true;
            }
        });

        this.setState({
            innerType: nowId,
        }, () => {
            Api.getVideoTypeTrueList(this.state.type, this.state.innerType, this.state.sortType, 1, 14, (innerE) => {
                this.setState({
                    videoData: innerE.list.data,
                    nowPage: innerE.list.current_page,
                    totalPage: innerE.list.last_page,
                });
            });
        });
    }

    _sortChangeTab = (type) => {
        let nowSortKey = this.state.sortTypeData[0].key;
        this.state.sortTypeData.every((item, index) => {
            if (item.name == type) {
                nowSortKey = item.key;
                return false;
            } else {
                return true
            }
        });

        this.setState({
            sortType: nowSortKey,
        }, () => {
            Api.getVideoTypeTrueList(this.state.type, this.state.innerType, this.state.sortType, 1, 14, (innerE) => {
                this.setState({
                    videoData: innerE.list.data,
                    nowPage: innerE.list.current_page,
                    totalPage: innerE.list.last_page,
                });
            });
        });
    }

    _videoAvaterOnPress = (id) => {
        //this.props.navigation.navigate('VideoModel', { videoId: id });
        naviToVideoService(id);
    }

    _getNextPageData = () => {
        // console.log('11122233');
        // console.log(this.state.nowPage);
        // console.log(this.state.totalPage);
        if (this.state.nowPage !== this.state.totalPage) {
            Api.getVideoTypeTrueList(this.state.type, this.state.innerType, this.state.sortType, this.state.nowPage + 1, 14, (e) => {
                if (e) {
                    // console.log('11122233');
                    // console.log(e);
                    this.setState((preState, props) => {
                        let newList = preState.videoData.concat(e.list.data);
                        return {
                            data: newList,
                            page: e.list.current_page,
                            totalPage: e.list.last_page
                        }
                    });
                }
            });
        }
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
                    <TabBar ref={(ref) => this.globalType = ref} tabNames={globalArr} tabTap={this._globalChangeTab} />
                    <TabBar ref={(ref) => this.innerType = ref} tabNames={typeArr} tabTap={this._innerChangeTab} />
                    <TabBar tabNames={sortArr} tabTap={this._sortChangeTab} />
                    <View style={{ flex: 1 }}>
                        {this.state.videoData && this.state.videoData.length > 0 &&
                            <FlatList
                                onEndReached={this._getNextPageData}
                                onEndReachedThreshold={0.1}
                                style={{ flex: 1 }}
                                data={this.state.videoData}
                                contentContainerStyle={{ alignSelf: 'center' }}
                                columnWrapperStyle={{ marginTop: 20 }}
                                showsVerticalScrollIndicator={false}
                                numColumns={2}
                                renderItem={({ item }) => <VideoAvater isVertical={false} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                            />}
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}