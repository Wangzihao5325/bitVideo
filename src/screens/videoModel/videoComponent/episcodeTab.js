import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as In18 from '../../../global/In18';

import IconBtn from '../../../components/imageBtn/IconBtn';

class Btn extends PureComponent {
    state = {
        isHighLight: false
    }

    btnOnPress = () => {
        if (this.props.highlightIndex === this.props.index) {
            return;
        } else {
            if (this.props.onPress) {
                this.props.onPress(this.props.index);
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
        console.log('go to select episode!');
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <View style={styles.titleContainer}>
                    <View style={styles.flexView2}>
                        <Text style={styles.titleText}>{In18.CHOOSE_EPISODE}</Text>
                    </View>
                    <View style={styles.flexView1}>
                        <Text style={styles.introText}>{`${In18.HOLE_TEXT}${this.props.totalEpisodeNum}${In18.EPISODE_TEXT}`}</Text>
                        <IconBtn style={{ marginRight: 15 }} height={16} width={16} onPress={this.moreIntro} source={require('../../../image/usual/arrow_right_circle.png')} />
                    </View>
                </View>
                {
                    this.state.source && <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={this.state.source}
                        renderItem={
                            ({ item, index }) => <Btn
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
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 5,
        marginHorizontal: 5
    },
    btnHighlightText: {
        color: 'rgb(5,131,255)',
        fontSize: 16
    },
    btnNormalText: {
        color: 'rgb(32,32,32)',
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
        color: 'rgb(54,54,54)',
        fontSize: 16,
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