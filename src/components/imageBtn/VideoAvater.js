import React, { PureComponent } from 'react';
import { StyleSheet, Image, View, Text, TouchableHighlight } from 'react-native';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

const verWidth = (Sizes.DEVICE_WIDTH - 6) / 3;
const verHeight = 1.5 * verWidth;
const hoWidth = (Sizes.DEVICE_WIDTH - 4) / 2;
const hoHeight = hoWidth / 1.5;
export default class VideoAvater extends PureComponent {
    static defaultProps = {
        isVertical: true,
        title: 'title',
        info: 'info',
    }

    btnOnPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    render() {
        let btnStyle = this.props.isVertical ? styles.verBtn : styles.hoBtn;
        let imageStyle = this.props.isVertical ? styles.verImage : styles.hoImage;
        let introText = this.props.info === '' ? `${In18.NO_INTRO}` : this.props.info;
        let scoreStyle = this.props.isVertical ? styles.verAbsStyle : styles.hoAbsStyle;
        return (
            <TouchableHighlight style={btnStyle} underlayColor='transparent' onPress={this.btnOnPress}>
                <View style={styles.flexView} >
                    {this.props.score && <Text style={scoreStyle}>{this.props.score}</Text>}
                    <Image style={[imageStyle, { zIndex: 1 }]} defaultSource={require('../../image/usual/image_load_failed.png')} source={this.props.imageSource} />
                    <Text style={[styles.titleText, { zIndex: 10 }]} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
                    <Text style={[styles.infoText, { zIndex: 10 }]} ellipsizeMode='tail' numberOfLines={1}>{introText}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    verBtn: {
        width: verWidth,
        height: verHeight + 41
    },
    flexView: {
        flex: 1
    },
    verImage: {
        height: verHeight,
        width: verWidth - 2,
        marginHorizontal: 1,
        borderRadius: 5
    },
    titleText: {
        color: 'rgb(33,33,33)',
        fontSize: 16,
        marginTop: 6,
        alignSelf: 'center'
    },
    infoText: {
        color: 'rgb(162,162,162)',
        fontSize: 12,
        marginTop: 5,
        alignSelf: 'center',
        marginHorizontal: 5
    },
    hoBtn: {
        width: hoWidth,
        height: hoHeight + 41
    },
    hoImage: {
        height: hoHeight,
        width: hoWidth - 2,
        marginHorizontal: 1,
        borderRadius: 5
    },
    verAbsStyle: {
        position: 'absolute',
        top: verHeight - 25,
        right: 5,
        color: 'rgb(243,109,0)',
        fontSize: 16,
        zIndex: 10
    },
    hoAbsStyle: {
        position: 'absolute',
        top: hoHeight - 25,
        right: 5,
        color: 'rgb(243,109,0)',
        fontSize: 16,
        zIndex: 10
    }
});