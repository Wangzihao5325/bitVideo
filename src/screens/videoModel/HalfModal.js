import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';

class IntroHalfModal extends PureComponent {
    render() {
        let title, intro = '';
        if (this.props.fullData) {
            title = this.props.fullData.title ? this.props.fullData.title : '';
            intro = this.props.fullData.intro ? this.props.fullData.intro : '';
        }
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={styles.titleContainer}>
                    <Text style={{ color: 'rgb(178,178,178)' }} >{title}</Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.contentText}>{intro}</Text>
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

export default connect(mapState2Props)(IntroHalfModal);

const styles = StyleSheet.create({
    titleContainer: {
        height: 40,
        width: Sizes.DEVICE_WIDTH,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgb(133,148,156)'
    },
    contentText: {
        marginTop: 10,
        color: 'rgb(178,178,178)',
        fontSize: 14,
        lineHeight: 20
    }
});