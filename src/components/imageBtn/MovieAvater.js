import React, { PureComponent } from 'react';
import { View, Image, TouchableHighlight, Text, StyleSheet } from 'react-native';
export default class MovieAvater extends PureComponent {
    btnOnPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }
    render() {
        return (
            <TouchableHighlight style={styles.container} onPress={this.btnOnPress} underlayColor='transparent'>
                <View style={{ flex: 1 }}>
                    <Image style={styles.image} source={this.props.imageSource} />
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>{this.props.title}</Text>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.intro}>{this.props.intro}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: 123,
        height: 185 + 22 + 6 + 17 + 5,
        display: 'flex',
        marginHorizontal: 1
    },
    image: {
        height: 185,
        width: 123,
        borderRadius: 5
    },
    title: {
        fontSize: 16,
        color: 'rgb(33,33,33)',
        alignSelf: 'center',
        marginTop: 6,
    },
    intro: {
        fontSize: 12,
        color: 'rgb(162,162,162)',
        marginTop: 5,
        marginLeft: 3
    }
});