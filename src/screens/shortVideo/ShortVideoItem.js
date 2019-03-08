import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

import Icon from 'react-native-vector-icons/FontAwesome';
import ShortVideoPlayer from './ShortVideoPlayer';

const Header = (props) => {
    return (
        <TouchableHighlight style={styles.headerContainer} onPress={props.toDetail} underlayColor='transparent'>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText} numberOfLines={2} ellipsizeMode='tail'>{props.text}</Text>
            </View>
        </TouchableHighlight>
    );
}
const Footer = (props) => {
    return (
        <View style={styles.footerContainer}>
            <TouchableHighlight style={styles.footerTextContainer} underlayColor='transparent' onPress={props.toDetail}>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.footerText}>{`${props.times}${In18.TIMES_PLAY}`}</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight style={styles.footerShareBtn} underlayColor='transparent' onPress={props.toShare}>
                <Icon name='share-alt' size={22} color='#909090' />
            </TouchableHighlight>
        </View>
    );
}

const Cover = (props) => {
    return (
        <View style={styles.coverContainer}>
            <Image style={styles.coverContainer} source={{ uri: `${props.source}` }} />
            <TouchableHighlight style={styles.coverBtn} onPress={props.playPress}>
                <Icon name='play' size={30} color='#909090' />
            </TouchableHighlight>
        </View>
    );
}

export default class ShortVideoItem extends PureComponent {

    _toShare = () => {
        console.log('go to share');
    }

    _toDetail = () => {
        console.log('go to detail');
    }

    _toPlay = () => {
        if (this.props.playPress) {
            this.props.playPress();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header text={this.props.title} toDetail={this._toDetail} />
                <View style={{ flex: 1 }} >
                    {this.props.nowPlaying === this.props.index ?
                        <ShortVideoPlayer videoUrl={this.props.videoUrl} /> :
                        <Cover playPress={this._toPlay} source={this.props.coverUrl} />
                    }
                </View>
                <Footer times={this.props.playTimes} toDetail={this._toDetail} toShare={this._toShare} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 42,
        width: Sizes.DEVICE_WIDTH,
        display: 'flex',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        color: 'gray',
        marginHorizontal: 10,
        lineHeight: 16
    },
    footerContainer: {
        height: 26,
        width: Sizes.DEVICE_WIDTH,
    },
    footerTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 12,
        lineHeight: 12,
        marginHorizontal: 10,
        color: 'gray',
    },
    footerShareBtn: {
        position: 'absolute',
        height: 22,
        width: 22,
        top: 2,
        right: 20
    },
    coverContainer: {
        height: 200,
        width: Sizes.DEVICE_WIDTH
    },
    coverBtn: {
        position: 'absolute',
        height: 30,
        width: 30,
        top: 85,
        left: (Sizes.DEVICE_WIDTH - 30) / 2
    },
    container: {
        height: 268,
        width: Sizes.DEVICE_WIDTH,
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderTopColor: '#909090',
        // borderTopWidth: StyleSheet.hairlineWidth,
    }
});