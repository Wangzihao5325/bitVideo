import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList, Share } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Colors from '../../global/Colors';

import shortVideoList from '../../mock/shortVideoList';
import ShortVideoItem from './ShortVideoItem';
const reg = { typeMap2Id: {}, type: [] };
class ShortVideo extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        shortVideoList: null,
        playingIndex: -1,
        nowPage: -1,
        lastPage: -1,
        lastUrl: '',
    };

    componentDidMount() {
        Api.getShortVideoListById(10, 1, (e) => {
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
    _flatListRefresh = () => {
        this.setState({
            playingIndex: -1
        });
        Api.getShortVideoListById(10, 1, (e) => {
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
            Api.getShortVideoListById(10, this.state.lastPage, (e) => {
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
    _goToInviteFriend = () => {
        Api.postShareQrCodeMessage(this.props.inviteCode, 'official', 'qrcode', (e) => {
            if (e.content) {
                let shareUrl = `${e.content.split(':')[1]}/share/${this.props.inviteCode}`;
                Share.share({
                    message: e.content,
                    url: shareUrl,
                    title: '蝌蚪视频App'
                }, {
                        dialogTitle: In18.SHARE_DIALOG_TITLE
                    })
                    .then(this._shareResult);
                // .catch((e) => { console.log(e) });
            }
        });
    }

    _shareResult = (result) => {
        if (result.action === Share.sharedAction) {
            // wait for other click
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationEvents
                        onWillBlur={this._willBlur}
                    />
                    <View style={{ flex: 1, marginTop: 10 }}>
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
                                            share={this._goToInviteFriend}
                                            detail={this._toDetail}
                                            playPress={() => this._palyPress(index)}
                                            nowPlaying={this.state.playingIndex}
                                            index={index}
                                            title={item.title}
                                            videoUrl={item.play_url}
                                            coverUrl={item.cover_path}
                                            playTimes={item.play_count}
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

function mapState2Props(store) {
    return {
        inviteCode: store.account.inviteCode,
    }
}

export default connect(mapState2Props)(ShortVideo);