import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import * as Sizes from '../../global/Sizes';
import { naviToVideoService } from '../../screens/videoModel/VideoService';

export default class AdModule extends PureComponent {
    _watchAd = () => {
        if (this.props.navi) {
            this.props.navi.navigate('VideoModel', { videoId: this.props.data.video_id, type: 'ad' });
        }
        //naviToVideoService(this.props.data.video_id, 'ad');
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={this._watchAd}>
                <View style={{ flex: 1 }}>
                    <Image style={styles.image} source={{ uri: this.props.data.cover_path }} />
                    <Text style={styles.titleText}>{this.props.data.title}</Text>
                    <Text style={styles.remarkText}>{this.props.data.remark}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH,
        height: 175,
        display: 'flex',
        marginTop: 10
    },
    image: {
        width: Sizes.DEVICE_WIDTH,
        height: 130,
        borderRadius: 5,
    },
    titleText: {
        marginLeft: 5,
        color: 'rgb(52,52,52)',
        fontSize: 14,
        marginTop: 5
    },
    remarkText: {
        marginLeft: 5,
        color: 'rgb(162,162,162)',
        fontSize: 12,
        marginTop: 10
    }
});