import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';

import IconBtn from '../../../components/imageBtn/IconBtn';

class VideoHeader extends PureComponent {
    moreIntro = () => {
        console.log('show more intro');
    }
    render() {
        let title = '';
        if (this.props.fullData) {
            title = this.props.fullData.title
        }
        return (
            <View style={styles.container}>
                <View style={styles.flexView2}>
                    <Text style={styles.titleText}>{title}</Text>
                </View>
                <View style={styles.flexView1}>
                    <Text style={styles.introText}>{In18.INTRODUCE_TEXT}</Text>
                    <IconBtn style={{ marginRight: 15 }} height={16} width={16} onPress={this.moreIntro} source={require('../../../image/usual/arrow_right_circle.png')} />
                </View>
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
        marginTop: 11
    },
    flexView2: {
        flex: 2,
        justifyContent: 'center'
    },
    flexView1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    titleText: {
        marginLeft: 37,
        fontSize: 16,
        color: 'rgb(54,54,54)'
    },
    introText: {
        fontSize: 14,
        color: 'rgb(54,54,54)',
        marginRight: 10
    }
});