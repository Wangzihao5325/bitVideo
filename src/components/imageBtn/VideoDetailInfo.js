import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, View, Image, Text } from 'react-native';
import * as Sizes from '../../global/Sizes';
import SecurtyImage from '../../components/securtyImage/index';
import { naviToVideoService } from '../../screens/videoModel/VideoService';

const hoWidth = (Sizes.DEVICE_WIDTH - 4) / 2.5;
const hoHeight = hoWidth / 1.5;

export default class VideoDetailInfo extends PureComponent {

    _goToSeeMovie = () => {
        this.props.navi.navigate('VideoModel', { videoId: this.props.id });
        //naviToVideoService(this.props.id);
    }

    render() {
        return (
            <TouchableHighlight style={styles.container} onPress={this._goToSeeMovie}>
                <View style={[styles.flexView, styles.borderBottom]}>
                    <View style={styles.imageContainer}>
                        {/* <Image style={styles.imageStyle} source={this.props.source} defaultSource={require('../../image/usual/image_load_failed.png')} /> */}
                        <SecurtyImage imageStyle={{ height: hoHeight, width: hoWidth, borderRadius: 5 }} style={styles.imageStyle} source={this.props.source} />
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
        width: hoWidth,
        height: 134,
        display: 'flex',
        justifyContent: 'center',
    },
    imageStyle: {
        height: hoHeight,
        width: hoWidth,
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