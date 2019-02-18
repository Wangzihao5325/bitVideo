import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';

class Select extends PureComponent {
    render() {
        let text = this.props.isSelect ? '已选' : '未选';
        return (
            <View style={styles.select}>
                <Text>{text}</Text>
            </View>
        );
    }
}

class VideoDetailInfoWithEdit extends PureComponent {
    state = {
        isSelectNow: false
    }

    _goToSeeMovie = () => {
        if (this.props.isSelectMode) {
            this.setState((preState, props) => {
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
                        <Image style={styles.imageStyle} source={this.props.source} defaultSource={require('../../image/usual/image_load_failed.png')} />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.titleText}>{this.props.title}</Text>
                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.introText}>{this.props.intro}</Text>
                        <Text style={styles.directorText}>{this.props.director}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

function mapState2Props(store) {
    return {
        isSelectMode: store.watchHistory.isEdit,
    }
}

export default connect(mapState2Props)(VideoDetailInfoWithEdit);

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
        marginLeft: 14
    },
    infoContainer: {
        flex: 1
    },
    titleText: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        marginLeft: 10,
        fontWeight: 'bold',
        marginTop: 16
    },
    introText: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
        marginTop: 15,
        marginRight: 20,
        height: 30,
        marginLeft: 10
    },
    directorText: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
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