import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { set_video_url_and_type } from '../../../store/actions/videoPlayAction';
import _ from 'lodash';

import NavigationService from '../../../app/NavigationService';

class Btn extends PureComponent {
    state = {
        isHighLight: false
    }

    btnOnPress = () => {
        if (this.props.highlightIndex === this.props.index) {
            return;
        } else {
            if (this.props.onPress) {
                if (this.props.index == 0) {
                    this.props.onPress(this.props.index);
                } else {
                    if (this.props.vip.id == 2) {
                        NavigationService.navigate('ToastModel', { type: 'SeeHD' });
                    } else {
                        this.props.onPress(this.props.index);
                    }
                }
            }
        }
    }
    render() {
        let textStyle = this.props.highlightIndex === this.props.index ? styles.btnHighlightText : styles.btnNormalText;
        return (
            <TouchableHighlight style={styles.btnContainer} onPress={this.btnOnPress} underlayColor='transparent'>
                <Text style={textStyle} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}

class EpiscodeTab extends PureComponent {

    state = {
        episodeHighlightIndex: 0,
        videoId: 0,
        source: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.videoId !== prevState.videoId) {
            let sourceWithHighlightIndex = nextProps.source.map((item) => {
                let newItem = _.assign({}, item);
                newItem.highlightIndex = 0;
                return newItem
            });
            if (nextProps.source.length > 0) {
                let obj = nextProps.source[0];
                if (obj.play_url_m3u8) {
                    store.dispatch(set_video_url_and_type(obj.play_url_m3u8, 'm3u8'));
                } else if (obj.play_url_mp4) {
                    store.dispatch(set_video_url_and_type(obj.play_url_mp4, 'mp4'));
                } else if (obj.play_url_h5) {
                    store.dispatch(set_video_url_and_type(obj.play_url_h5, 'h5'));
                }
            }
            return {
                episodeHighlightIndex: 0,
                videoId: nextProps.videoId,
                source: sourceWithHighlightIndex,
            }
        } else {
            let sourceWithHighlightIndex = nextProps.source.map((item) => {
                let newItem = _.assign({}, item);
                newItem.highlightIndex = prevState.episodeHighlightIndex;
                return newItem
            });
            if (nextProps.source.length > prevState.episodeHighlightIndex) {
                let obj = nextProps.source[prevState.episodeHighlightIndex];
                if (obj.play_url_m3u8) {
                    store.dispatch(set_video_url_and_type(obj.play_url_m3u8, 'm3u8'));
                } else if (obj.play_url_mp4) {
                    store.dispatch(set_video_url_and_type(obj.play_url_mp4, 'mp4'));
                } else if (obj.play_url_h5) {
                    store.dispatch(set_video_url_and_type(obj.play_url_h5, 'h5'));
                }
            }
            return {
                source: sourceWithHighlightIndex
            }
        }
    }

    itemOnPress = (index) => {
        this.setState({
            episodeHighlightIndex: index
        });
    }

    moreIntro = () => {
        // console.log('go to select episode!');
    }

    _chooseEpiscode = () => {
        if (typeof this.props.toChooseEpiscode === 'function') {
            this.props.toChooseEpiscode();
        }
    }

    render() {
        return (
            <View style={{ marginTop: 10, zIndex: 10 }}>
                <View style={styles.titleContainer}>
                    <View style={styles.flexView2}>
                        <Text style={styles.titleText}>画质选择</Text>
                    </View>
                    <View style={styles.flexView1}>
                        {/* <Text style={styles.introText}>{`${In18.HOLE_TEXT}${this.props.totalEpisodeNum}${In18.EPISODE_TEXT}`}</Text>
                        <IconBtn style={{ marginRight: 15 }} height={16} width={16} onPress={this._chooseEpiscode} source={require('../../../image/usual/arrow_right_circle.png')} /> */}
                    </View>
                </View>
                {
                    this.state.source && <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={this.state.source}
                        renderItem={
                            ({ item, index }) => <Btn
                                vip={this.props.vip}
                                key={index}
                                index={index}
                                highlightIndex={item.highlightIndex}
                                title={item.play_series}
                                onPress={this.itemOnPress}
                            />}
                    />
                }
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        source: store.videoDeatilInfo.episodeSource,
        videoId: store.videoDeatilInfo.id,
        totalEpisodeNum: store.videoDeatilInfo.totalEpisodeNum,
        vip: store.account.vip,
    }
}

export default connect(mapState2Props)(EpiscodeTab);

const styles = StyleSheet.create({
    btnContainer: {
        height: 40,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,57,62)',
        borderRadius: 5,
        marginHorizontal: 5
    },
    btnHighlightText: {
        color: 'rgb(254,163,93)',
        fontSize: 16
    },
    btnNormalText: {
        color: 'rgb(178,178,178)',
        fontSize: 16
    },
    titleContainer: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        marginLeft: 10,
        color: 'rgb(178,178,178)',
        fontSize: 16,
        fontWeight: 'bold'
    },
    flexView2: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexView1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    introText: {
        fontSize: 12,
        color: 'rgb(100,100,100)',
        marginRight: 10
    }
});