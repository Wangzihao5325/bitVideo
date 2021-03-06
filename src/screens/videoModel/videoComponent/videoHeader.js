import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';

import IconBtn from '../../../components/imageBtn/IconBtn';

class VideoHeader extends PureComponent {

    moreIntro = () => {
        if (typeof this.props.toIntro === 'function') {
            this.props.toIntro();
        }
    }

    render() {
        let title = '';
        if (this.props.fullData) {
            title = this.props.fullData.title;
        }
        return (
            <View style={styles.container}>
                <View style={styles.flexView2}>
                    <Text style={styles.titleText} numberOfLines={1} ellipsizeMode='middle' >{title}</Text>
                </View>
                {/* <IconBtn style={{ marginRight: 15 }} height={16} width={16} onPress={this.moreIntro} source={require('../../../image/usual/arrow_right_circle.png')} /> */}
            </View>
        );
    }
}
function mapState2Props(store) {
    return {
        fullData: store.videoDeatilInfo.fullData
    }
}

export default connect(mapState2Props)(VideoHeader);

const styles = StyleSheet.create({
    container: {
        height: 22,
        width: Sizes.DEVICE_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 11,
        zIndex: 10,
        alignItems: 'center'
    },
    flexView2: {
        flex: 2,
        justifyContent: 'center'
    },
    flexView1: {

        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    titleText: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 16,
        color: 'rgb(178,178,178)',
        lineHeight: 17
    },
    introText: {
        fontSize: 14,
        color: 'rgb(178,178,178)',
        marginRight: 10
    }
});