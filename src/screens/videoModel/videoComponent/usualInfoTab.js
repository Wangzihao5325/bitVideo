import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';

import * as Sizes from '../../../global/Sizes';

class UsualInfoTab extends PureComponent {
    render() {
        let types = [];
        if (this.props.typeArr && this.props.typeArr.length > 0) {
            console.log('11111111');
            this.props.typeArr.forEach((item, index) => {
                let typeText = item.type_label;
                types.push(<Text key={index} style={styles.typeText}>{typeText}</Text>);
            });
        }
        console.log(types);
        return (
            <View style={styles.container}>
                <View style={{ flex: 2 }}>
                    <View style={styles.flexView1}>
                        <Text style={styles.playTimesText} key={10000}>8.57万 次播放</Text>
                        {types.length > 0 && types}
                    </View>
                    <View style={styles.flexView2}>
                        <Text style={styles.sourceTitleText}>影片来源</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        typeArr: store.videoDeatilInfo.type
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