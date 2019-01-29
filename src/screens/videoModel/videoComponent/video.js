import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as Sizes from '../../../global/Sizes';

import Video from 'react-native-video';

//'https://pp.605ziyuan.com/20180905/btValsHQ/index.m3u8'
class XSVideo extends PureComponent {
    onBuffer = () => {
        console.log('is on buffer');
    }

    videoError = () => {
        console.log('is on error');
    }

    render() {
        if (this.props.videoUrl) {
            return (
                <Video
                    source={{ uri: this.props.videoUrl }}
                    ref={(ref) => { this.player = ref }}
                    onBuffer={this.onBuffer}
                    onError={this.videoError}
                    style={styles.bgVideo}
                />
            );
        } else {
            return (
                <View style={styles.bgVideo} />
            );
        }
    }
}

function mapState2Props(store) {
    return {
        videoType: store.videoPlay.videoType,
        videoUrl: store.videoPlay.videoUrl,
    }
}

export default connect(mapState2Props)(XSVideo);

const styles = StyleSheet.create({
    bgVideo: {
        height: 200,
        width: Sizes.DEVICE_WIDTH,
        backgroundColor: 'black'
    }
});