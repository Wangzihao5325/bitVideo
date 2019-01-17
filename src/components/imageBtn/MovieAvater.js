import React, { PureComponent } from 'react';
import { View, Image, TouchableHighlight, Text, StyleSheet } from 'react-native';
export default class MovieAvater extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.image} source={{ uri: 'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2536196126.jpg' }} />
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.title}>W’z《ウィズ》</Text>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={styles.intro}>荒城幸也，大概14岁。平常一个人在做DJ</Text>
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