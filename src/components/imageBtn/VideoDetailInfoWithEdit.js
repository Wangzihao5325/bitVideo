import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Colors from '../../global/Colors';
import SecurtyImage from '../../components/securtyImage/index';

class Select extends PureComponent {
    render() {
        let source = this.props.isSelect ? require('../../image/usual/select.png') : require('../../image/usual/unSelect.png');
        return (
            <View style={styles.select}>
                <Image style={{ height: 26, width: 26 }} source={source} />
            </View>
        );
    }
}

class VideoDetailInfoWithEdit extends PureComponent {
    state = {
        isSelectNow: false,
        selectAllKey: false,
        id: null
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.id == nextProps.id && prevState.selectAllKey == nextProps.selectAll) {
            return {
                ...prevState
            }
        } else {
            return {
                isSelectNow: nextProps.selectAll,
                selectAllKey: nextProps.selectAll,
                id: nextProps.id
            }
        }
    }

    _goToSeeMovie = () => {
        if (this.props.isSelectMode) {
            this.setState((preState, props) => {
                if (preState.isSelectNow) {
                    this.props.deleteSet.delete(this.props.id);
                } else {
                    this.props.deleteSet.add(this.props.id);
                }
                let newState = !preState.isSelectNow;
                return {
                    isSelectNow: newState
                }
            });
        } else {
            this.props.navi.navigate('VideoModel', { videoId: this.props.id });
        }
    }

    render() {
        return (
            <TouchableHighlight style={styles.container} onPress={this._goToSeeMovie} underlayColor='transparent'>
                <View style={[styles.flexView, styles.borderBottom]}>
                    {this.props.isSelectMode && <Select isSelect={this.state.isSelectNow} />}
                    <View style={styles.imageContainer}>
                        <SecurtyImage imageStyle={{ height: 114, width: 88, borderRadius: 5 }} style={styles.imageStyle} source={this.props.source} />
                        {/* <Image style={styles.imageStyle} source={this.props.source} defaultSource={require('../../image/usual/image_load_failed.png')} /> */}
                    </View>
                    <View style={styles.infoContainer}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.titleText}>{this.props.title}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.introText}>{this.props.intro}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.directorText}>{this.props.director}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

function mapState2PropsHistory(store) {
    return {
        isSelectMode: store.watchHistory.isEdit,
        selectAll: store.watchHistory.selectAll,
        deleteSet: store.watchHistory.deleteSet,
    }
}

function mapState2PropsCollect(store) {
    return {
        isSelectMode: store.userCollect.isEdit,
        selectAll: store.userCollect.selectAll,
        deleteSet: store.userCollect.deleteSet,
    }
}

const VideoDetailInfoWithEditByHistory = connect(mapState2PropsHistory)(VideoDetailInfoWithEdit);
const VideoDetailInfoWithEditByCollect = connect(mapState2PropsCollect)(VideoDetailInfoWithEdit);

export {
    VideoDetailInfoWithEditByHistory,
    VideoDetailInfoWithEditByCollect
}
// export default connect(mapState2Props)(VideoDetailInfoWithEdit);

const styles = StyleSheet.create({
    container: {
        height: 134,
        width: '100%',
        display: 'flex',
    },
    flexView: {
        flex: 1,
        flexDirection: 'row'
    },
    imageContainer: {
        width: 88 + 14,
        height: 134,
        display: 'flex',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 114,
        width: 88,
        marginLeft: 14,
        borderRadius: 5
    },
    infoContainer: {
        flex: 1
    },
    titleText: {
        fontSize: 16,
        color: Colors.DEFAULT_TEXT_COLOR,
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 16,
    },
    introText: {
        fontSize: 12,
        color: Colors.DEFAULT_TEXT_COLOR,
        marginTop: 15,
        marginRight: 20,
        height: 30,
        marginLeft: 10
    },
    directorText: {
        fontSize: 12,
        color: Colors.DEFAULT_TEXT_COLOR,
        marginTop: 8,
        marginLeft: 10
    },
    borderBottom: {
        borderBottomColor: 'rgba(153,153,153,0.2)',
        borderBottomWidth: 1
    },
    select: {
        height: 134,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});