import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableHighlight, Image, Platform } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';
import * as MathUtils from '../../global/utils/MathUtil';

import Icon from 'react-native-vector-icons/FontAwesome';
import RootPlayer from '../../components/player/RootPlayer';

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
            <View style={styles.footerTextContainer}>
                <Text style={styles.footerText}>{`${MathUtils.playCountTransform(props.times)}${In18.TIMES_PLAY}`}</Text>
            </View>
            <TouchableHighlight style={styles.footerShareBtn} underlayColor='transparent' onPress={props.toShare}>
                <Icon name='share-alt' size={22} color='#909090' />
            </TouchableHighlight>
        </View>
    );
}

const Cover = (props) => {
    return (
        <View style={styles.coverContainer}>
            <TouchableHighlight style={styles.coverContainer} onPress={props.coverPress} underlayColor='transparent'>
                <Image style={styles.coverContainer} source={{ uri: `${props.source}` }} />
            </TouchableHighlight>
            <TouchableHighlight style={styles.coverBtn} onPress={props.playPress} underlayColor='transparent'>
                <Icon name='play' size={30} color='#909090' />
            </TouchableHighlight>
            <Text style={styles.coverTitle}>{props.title}</Text>
        </View>
    );
}

export default class ShortVideoItem extends PureComponent {

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
            this.props.playPress();
        }
    }
    //http://youku.com-www-163.com/20180506/576_bf997390/index.m3u8  //this.props.videoUrl
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }} >
                    {this.props.nowPlaying === this.props.index ?
                        <RootPlayer videoUrl={this.props.videoUrl} disableBack={true} /> :
                        <Cover title={this.props.title} coverPress={this._toDetail} playPress={this._toPlay} source={this.props.coverUrl} />
                    }
                </View>
                {/* <Header text={this.props.title} toDetail={this._toDetail} />
                <Footer times={this.props.playTimes} toDetail={this._toDetail} toShare={this._toShare} /> */}
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
        fontSize: Platform.OS === 'ios' ? 16 : 15,
        color: 'gray',
        marginHorizontal: 10,
        lineHeight: 16
    },
    footerContainer: {
        height: 68,//26
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
        height: 268,
        width: Sizes.DEVICE_WIDTH,
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderTopColor: '#909090',
        // borderTopWidth: StyleSheet.hairlineWidth,
    }
});