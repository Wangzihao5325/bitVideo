import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

import Icon from 'react-native-vector-icons/FontAwesome';
import XSVideo from '../videoModel/videoComponent/video';

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

class VideoMoudle extends PureComponent {

}

export default class ShortVideoItem extends PureComponent {

    _toShare = () => {
        console.log('go to share');
    }

    _toDetail = () => {
        console.log('go to detail');
    }

    render() {
        return (
            <View style={styles.container}>
                <Header text={this.props.title} toDetail={this._toDetail} />
                <View style={{ flex: 1 }} />
                <Footer times='0' toDetail={this._toDetail} toShare={this._toShare} />
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
    container: {
        height: 268,
        width: Sizes.DEVICE_WIDTH,
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
        // borderTopColor: '#909090',
        // borderTopWidth: StyleSheet.hairlineWidth,
    }
});