import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';

export default class GuessLikeItem extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexContainer}>
                    <View style={styles.flexContainer}>
                        <Text style={styles.titleText} numberOfLines={2} ellipsizeMode='tail'>{this.props.title}</Text>
                    </View>
                    <View style={[styles.flexContainer, { flexDirection: 'column-reverse' }]}>
                        <Text style={styles.timeText}>{`${this.props.times}${In18.TIMES_PLAY}`}</Text>
                    </View>
                </View>
                <Image style={styles.image} source={{ uri: this.props.uri }} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 80,
        width: Sizes.DEVICE_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    flexContainer: {
        flex: 1
    },
    titleText: {
        marginTop: 10,
        lineHeight: 15,
        fontSize: 14,
        marginHorizontal: 10
    },
    timeText: {
        marginBottom: 10,
        fontSize: 10,
        marginHorizontal: 10
    },
    image: {
        height: 60,
        width: 107,
        marginHorizontal: 10
    }
});