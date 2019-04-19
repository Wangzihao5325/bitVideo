import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Platform } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';
import * as MathUtils from '../../global/utils/MathUtil';
import Api from '../../socket/index';

import Icon from 'react-native-vector-icons/FontAwesome';
import RootPlayer from '../../components/player/RootPlayer';
import ToastRoot from '../../components/toast/index';
import NavigationService from '../../app/NavigationService';

import SecurtyImage from '../../components/securtyImage/index';

const Footer = (props) => {
    return (
        <View style={styles.footerContainer}>
            <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>{`${MathUtils.playCountTransform(props.times)}${In18.TIMES_PLAY}`}</Text>
            </View>
            <TouchableHighlight style={styles.footerShareBtn} underlayColor='transparent' onPress={props.toShare}>
                {/* <Icon name='share-alt' size={22} color='#909090' /> */}
                <Image style={{ height: 22, width: 22 }} source={require('../../image/usual/share.png')} />
            </TouchableHighlight>
        </View>
    );
}

const Cover = (props) => {
    return (
        <View style={styles.coverContainer}>
            <TouchableHighlight style={styles.coverContainer} onPress={props.coverPress} underlayColor='transparent'>
                {/* <Image style={styles.coverContainer} source={{ uri: `${props.source}` }} /> */}
                <SecurtyImage default={require('../../image/usual/banner_load_failed.png')} style={styles.coverContainer} source={{ uri: `${props.source}` }} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.coverBtn} onPress={props.playPress} underlayColor='transparent'>
                <Icon name='play' size={30} color='#909090' />
            </TouchableHighlight>
            <Text style={styles.coverTitle} numberOfLines={1} ellipsizeMode='middle'>{props.title}</Text>
        </View>
    );
}

export default class ShortVideoItem extends PureComponent {
    state = {
        url: null,
    }

    _toShare = () => {
        if (typeof this.props.share === 'function') {
            this.props.share(this.props.videoUrl);
        }
    }

    _toDetail = () => {
        if (typeof this.props.detail === 'function') {
            this.props.detail(this.props.videoUrl, this.props.videoId, this.props.title, this.props.playTimes);
        }
    }

    _toPlay = () => {
        if (typeof this.props.playPress === 'function') {
            this.props.playPress(this.props.index);
            Api.getVideoInfo(this.props.videoId, (result, code, message) => {
                if (result && result.is_can == 1) {
                    this.setState({
                        url: this.props.videoUrl
                    });
                } else {
                    this.props.playPress(-1);
                    NavigationService.navigate('ToastModel', { type: 'NoTimes' });
                }
            });
        }
    }
    //http://youku.com-www-163.com/20180506/576_bf997390/index.m3u8  //this.props.videoUrl
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }} >
                    {this.props.nowPlaying === this.props.index ?
                        <RootPlayer disableFullscreen={true} videoUrl={this.state.url} disableBack={true} /> :
                        <Cover title={this.props.title} coverPress={this._toPlay} playPress={this._toPlay} source={this.props.coverUrl} />
                    }
                </View>
                <Footer times={this.props.playTimes} toDetail={this._toDetail} toShare={this._toShare} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    footerContainer: {
        height: 48,//26
        width: Sizes.DEVICE_WIDTH,
    },
    footerTextContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    footerText: {
        fontSize: 14,
        color: 'rgb(254,163,91)',
        marginLeft: 15,
        fontWeight: '500'
    },
    footerShareBtn: {
        position: 'absolute',
        height: 22,
        width: 22,
        top: 13,
        right: 15
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
    coverTitle: {
        position: 'absolute',
        top: 7,
        width: 0,
        height: 36,
        width: Sizes.DEVICE_WIDTH,
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    container: {
        height: 248,
        width: Sizes.DEVICE_WIDTH,
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderTopColor: '#909090',
        // borderTopWidth: StyleSheet.hairlineWidth,
    }
});