import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

import TabBar from '../../components/tabBar/index';

import shortVideoList from '../../mock/shortVideoList';
import ShortVideoItem from './ShortVideoItem';
const reg = { typeMap2Id: {}, type: [] };
export default class ShortVideo extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: In18.DEFALUT_SHORT_VIDEO_TYPE,
        shortVideoList: null,
        playingIndex: -1,
        nowPage: -1,
        lastPage: -1,
        lastUrl: '',
        nowTypeKey: -1,
    };

    componentDidMount() {
        Api.getShortVideoType((e) => {
            if (Array.isArray(e)) {
                e.forEach((item) => {
                    reg.typeMap2Id[item.title] = item.id;
                    reg.type.push(item.title);
                });

                this.setState({ type: reg.type });
                let defalutKey = reg.typeMap2Id[reg.type[0]];
                Api.getShortVideoListById(defalutKey, 10, 1, (e) => {
                    if (e.data.length > 0) {
                        this.setState({
                            shortVideoList: e.data,
                            playingIndex: -1,
                            nowPage: e.current_page,
                            lastPage: e.last_page,
                            nowTypeKey: defalutKey,
                            lastUrl: e.last_page_url,
                        });
                    } else {
                        //mock数据
                        this.setState({
                            shortVideoList: shortVideoList
                        });
                    }
                });
            }
        });
    }

    _classifyChanged = (classify) => {
        let classifyId = reg.typeMap2Id[classify];
        Api.getShortVideoListById(classifyId, 10, 1, (e) => {
            if (e.data.length > 0) {
                this.setState({
                    shortVideoList: e.data,
                    playingIndex: -1,
                    nowPage: e.current_page,
                    lastPage: e.last_page,
                    nowTypeKey: classifyId,
                    lastUrl: e.last_page_url,
                });
            }
        });
    }

    _flatListRefresh = () => {
        this.setState({
            playingIndex: -1
        });
        Api.getShortVideoListById(this.state.nowTypeKey, 10, 1, (e) => {
            if (e.data.length > 0) {
                this.setState({
                    shortVideoList: e.data,
                    playingIndex: -1,
                    nowPage: e.current_page,
                    lastPage: e.last_page,
                    lastUrl: e.last_page_url,
                });
            } else {
                //mock数据
                this.setState({
                    shortVideoList: shortVideoList
                });
            }
        });
    }

    _getNextPageData = () => {
        if (this.state.nowPage !== this.state.lastPage) {
            this.setState({
                playingIndex: -1
            });
            Api.getShortVideoListById(this.state.nowTypeKey, 10, this.state.lastPage, (e) => {
                if (e.data.length > 0) {
                    this.setState({
                        shortVideoList: e.data,
                        playingIndex: -1,
                        nowPage: e.current_page,
                        lastPage: e.last_page,
                        lastUrl: e.last_page_url,
                    });
                } else {
                    //mock数据
                    this.setState({
                        shortVideoList: shortVideoList
                    });
                }
            });
        }
    }

    _palyPress = (index) => {
        this.setState({
            playingIndex: index
        });
    }

    _willBlur = () => {
        this.setState({
            playingIndex: -1
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <NavigationEvents
                    onWillBlur={this._willBlur}
                />
                <TabBar style={{ width: Sizes.DEVICE_WIDTH }} tabNames={this.state.type} tabTap={this._classifyChanged} />
                <View style={{ flex: 1 }}>
                    {this.state.shortVideoList &&
                        <FlatList
                            onRefresh={this._flatListRefresh}
                            refreshing={false}
                            onEndReached={this._getNextPageData}
                            onEndReachedThreshold={0.1}
                            data={this.state.shortVideoList}
                            extraData={this.state}
                            renderItem={
                                ({ item, index }) =>
                                    <ShortVideoItem
                                        playPress={() => this._palyPress(index)}
                                        nowPlaying={this.state.playingIndex}
                                        index={index}
                                        title={item.title}
                                        videoUrl={item.play_url}
                                        coverUrl={item.cover_path}
                                        playTimes={item.play_count_real}
                                    />
                            }
                        />}
                </View>
            </SafeAreaView>
        );
    }
}