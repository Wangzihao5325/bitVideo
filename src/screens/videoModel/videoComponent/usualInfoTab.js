import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as MathUtil from '../../../global/utils/MathUtil';
import * as In18 from '../../../global/In18';

import IconBtn from '../../../components/imageBtn/IconBtnWithTitle';

class UsualInfoTab extends PureComponent {
    render() {
        let types = [];
        if (this.props.typeArr && this.props.typeArr.length > 0) {
            this.props.typeArr.forEach((item, index) => {
                let typeText = item.type_label;
                types.push(<Text key={index} style={styles.typeText}>{typeText}</Text>);
            });
        }
        let playCount = 0;
        if (this.props.fullData) {
            playCount = this.props.fullData.play_count;
        }
        playCount = MathUtil.playCountTransform(playCount);
        return (
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <View style={styles.flexView1}>
                        <Text style={styles.playTimesText} key={10000}>{`${playCount} ${In18.TIMES_PLAY}`}</Text>
                        {types.length > 0 && types}
                    </View>
                    <View style={styles.flexView2}>
                        <Text style={styles.sourceTitleText}>{In18.VIDEO_COME_FROM}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <IconBtn titleStyle={{ fontSize: 12, color: 'rgb(32,32,32)' }} source={require('../../../image/videoDetail/feedBack.png')} title='反馈' onPress={() => console.log('123')} />
                    <IconBtn titleStyle={{ fontSize: 12, color: 'rgb(32,32,32)' }} source={require('../../../image/videoDetail/video_share.png')} title='分享' onPress={() => console.log('123')} />
                </View>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        typeArr: store.videoDeatilInfo.type,
        fullData: store.videoDeatilInfo.fullData
    }
}

export default connect(mapState2Props)(UsualInfoTab);

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomColor: 'rgb(244,244,244)',
        borderBottomWidth: 1
    },
    flexView1: {
        display: 'flex',
        height: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    flexView2: {
        display: 'flex',
        height: 17,
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    typeText: {
        fontSize: 12,
        color: 'rgb(100,100,100)',
        marginLeft: 17
    },
    playTimesText: {
        fontSize: 12,
        color: 'rgb(100,100,100)',
        marginLeft: 15
    },
    sourceTitleText: {
        fontSize: 12,
        color: 'rgb(32,32,32)',
        marginLeft: 15
    }
});