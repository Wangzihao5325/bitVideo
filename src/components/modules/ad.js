import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback, Linking } from 'react-native';
import * as Sizes from '../../global/Sizes';
import { naviToVideoService } from '../../screens/videoModel/VideoService';
import Api from '../../socket/index';
import SecurtyImage from '../../components/securtyImage/index';


export default class AdModule extends PureComponent {
    _watchAd = () => {
        if (this.props.data.type == 'LINK') {
            Api.postTaskAndExchange('CLICK_AD', (e, code, message) => {
                //do nothing
            })
            Linking.openURL(this.props.data.redirect_url);
        } else if (this.props.data.type == 'VIDEO') {
            if (this.props.navi) {
                this.props.navi.navigate('VideoModel', { videoId: this.props.data.video_id, type: 'ad' });
            }
            //naviToVideoService(this.props.data.video_id, 'ad');
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={this._watchAd}>
                <View style={{ flex: 1 }}>
                    <SecurtyImage default={require('../../image/usual/banner_load_failed.png')} style={styles.image} source={{ uri: this.props.data.cover_oss_path }} />
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