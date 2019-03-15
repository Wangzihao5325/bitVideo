import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, FlatList, Share } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';

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
                    this.setState((preState, props) => {
                        let newList = preState.shortVideoList.concat(e.data);
                        return {
                            shortVideoList: newList,
                            playingIndex: -1,
                            nowPage: e.current_page,
                            lastPage: e.last_page,
                            lastUrl: e.last_page_url,
                        }
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

    //进入短视频详情
    _toDetail = (url, id, title, times) => {
        this.props.navigation.navigate('ShortVideoDetail', { ShortVideoUrl: `${url}`, id: id, title: title, times: times });
    }

    //分享
    _toShare = (url) => {
        Share.share({
            message: In18.SHARE_MESSAGE,
            url: url,
            title: In18.SHARE_TITLE
        }, {
                dialogTitle: In18.SHARE_DIALOG_TITLE
            })
            .then(this._shareResult)
            .catch((e) => { console.log(e) });
    }

    _shareResult = (result) => {
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('shared with action type');
            } else {
                console.log(done);
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('dismiss');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationEvents
                        onWillBlur={this._willBlur}
                    />
                    <TabBar style={{ width: Sizes.DEVICE_WIDTH }} tabNames={this.state.type} tabTap={this._classifyChanged} />
                    <View style={{ flex: 1 }}>
                        {this.state.shortVideoList &&
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                onRefresh={this._flatListRefresh}
                                refreshing={false}
                                onEndReached={this._getNextPageData}
                                onEndReachedThreshold={0.1}
                                data={this.state.shortVideoList}
                                extraData={this.state}
                                renderItem={
                                    ({ item, index }) =>
                                        <ShortVideoItem
                                            share={this._toShare}
                                            detail={this._toDetail}
                                            playPress={() => this._palyPress(index)}
                                            nowPlaying={this.state.playingIndex}
                                            index={index}
                                            title={item.title}
                                            videoUrl={item.play_url}
                                            coverUrl={item.cover_path}
                                            playTimes={item.play_count_real}
                                            videoId={item.id}
                                        />
                                }
                            />}
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}