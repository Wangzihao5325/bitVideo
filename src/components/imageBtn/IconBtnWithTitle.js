import React, { PureComponent } from 'react';
import { TouchableHighlight, Image, View, Text, StyleSheet } from 'react-native';
import * as Sizes from '../../global/Sizes';

const ICON_SIZE = 22;
const TITLE_SIZE = 14;
export default class IconBtn extends PureComponent {
    btnOnPress = () => {
        if (typeof this.props.onPress === 'function') {
            this.props.onPress();
        }
    }
    render() {
        return (
            <TouchableHighlight
                style={[styles.container, this.props.containerStyle]}
                onPress={this.btnOnPress}
                underlayColor='transparent'
            >
                <View style={[styles.flexView,this.props.flexStyle]}>
                    <Image
                        style={[styles.image, this.props.imageStyle]}
                        source={this.props.source}
                    />
                    <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 45,
        width: Sizes.ICON_BTN_WITH_TITLE_CONTAINER_WIDTH,
        display: 'flex'
    },
    flexView: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    image: {
        height: ICON_SIZE,
        width: ICON_SIZE
    },
    title: {
        color: 'rgb(54,54,54)',
        fontSize: TITLE_SIZE
    }
});