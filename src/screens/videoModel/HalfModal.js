import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';

class IntroHalfModal extends PureComponent {
    render() {
        let title, intro = '';
        if (this.props.fullData) {
            title = this.props.fullData.title ? this.props.fullData.title : '';
            intro = this.props.fullData.intro ? this.props.fullData.intro : '';
        }
        // console.log(title);
        // console.log('121');
        // console.log(intro);
        // console.log('121');
        // console.log(this.props.fullData);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.titleContainer}>
                    <Text >{title}</Text>
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
        justifyContent: 'center'
    },
    contentText: {
        marginTop: 10
    }
});