import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { set_episode_source } from '../../../store/actions/videoDetailInfoAction';
import _ from 'lodash';

class Btn extends PureComponent {
    state = {
        isHighLight: false
    }

    btnOnPress = () => {
        // if (this.props.highlightIndex === this.props.index) {
        //     return;
        // } else {
        //     if (this.props.onPress) {
        //         this.props.onPress(this.props.index);
        //     }
        // }
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

class SourceTab extends PureComponent {
    state = {
        sourceTypeHighlightIndex: 0,
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
                let regObj = nextProps.source[0];
                store.dispatch(set_episode_source(regObj.video_list, regObj.video_total, regObj.title));
            }
            return {
                sourceTypeHighlightIndex: 0,
                videoId: nextProps.videoId,
                source: sourceWithHighlightIndex,
            }
        } else {
            let sourceWithHighlightIndex = nextProps.source.map((item) => {
                let newItem = _.assign({}, item);
                newItem.highlightIndex = prevState.sourceTypeHighlightIndex;
                return newItem
            });
            if (nextProps.source.length > prevState.sourceTypeHighlightIndex) {
                let regObj = nextProps.source[prevState.sourceTypeHighlightIndex];
                store.dispatch(set_episode_source(regObj.video_list, regObj.video_total, regObj.title));
            }
            return {
                source: sourceWithHighlightIndex
            }
        }
    }

    itemOnPress = (index) => {
        this.setState({
            sourceTypeHighlightIndex: index
        });
    }

    render() {
        return (
            <View style={this.props.style}>
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
                                title={item.title}
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
        source: store.videoDeatilInfo.videoSource,
        videoId: store.videoDeatilInfo.id,
    }
}

export default connect(mapState2Props)(SourceTab);

const styles = StyleSheet.create({
    btnContainer: {
        height: 40,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: 'transparent'
    },
    btnHighlightText: {
        color: 'transparent',
        fontSize: 16
    },
    btnNormalText: {
        color: 'transparent',
        fontSize: 16
    },
});