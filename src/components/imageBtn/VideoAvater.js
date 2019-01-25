import React, { PureComponent } from 'react';
import { StyleSheet, Image, View, Text, TouchableHighlight } from 'react-native';
import * as Sizes from '../../global/Sizes';

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
        return (
            <TouchableHighlight style={btnStyle} underlayColor='transparent' onPress={this.btnOnPress}>
                <View style={styles.flexView} >
                    <Image style={imageStyle} source={this.props.imageSource} />
                    <Text style={styles.titleText} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
                    <Text style={styles.infoText} ellipsizeMode='tail' numberOfLines={1}>{this.props.info}</Text>
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
        alignSelf: 'center'
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
    }
});