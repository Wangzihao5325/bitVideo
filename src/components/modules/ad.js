import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as Sizes from '../../global/Sizes';

export default class AdModule extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: this.props.data.cover_path }} />
                <Text style={styles.titleText}>{this.props.data.title}</Text>
                <Text style={styles.remarkText}>{this.props.data.remark}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH,
        height: 160,
        display: 'flex',
        marginTop: 10
    },
    image: {
        width: Sizes.DEVICE_WIDTH,
        height: 130,
    },
    titleText: {
        marginLeft: 15,
        color: 'rgb(52,52,52)',
        fontSize: 14,
        marginTop: 5
    },
    remarkText: {
        marginLeft: 15,
        color: 'rgb(162,162,162)',
        fontSize: 12,
        marginTop: 10
    }
});