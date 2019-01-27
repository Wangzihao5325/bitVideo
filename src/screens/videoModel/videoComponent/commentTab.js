import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as MathUtil from '../../../global/utils/MathUtil';
import * as In18 from '../../../global/In18';

import IconBtn from '../../../components/imageBtn/IconBtn';

class CommentTab extends PureComponent {
    render() {
        let commentSum = 0;
        if (this.props.fullData) {
            commentSum = this.props.fullData.comment_sum;
        }
        commentSum = MathUtil.playCountTransform(commentSum);
        return (
            <View style={styles.container}>
                <Image style={styles.commentImage} source={require('../../../image/videoDetail/comment.png')} />
                <Text style={styles.commentText}>{`${commentSum}${In18.COMMENT_TEXT}`}</Text>
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <Text style={styles.text2}>902人</Text>
                    <IconBtn style={{ marginRight: 5 }} source={require('../../../image/videoDetail/hand_unClick.png')} height={22} width={22} />
                    <Text style={styles.text1}>0.1万</Text>
                    <IconBtn style={{ marginRight: 5 }} source={require('../../../image/videoDetail/hand_click.png')} height={22} width={22} imageStyle={{ transform: [{ rotate: '180deg' }] }} />
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

export default connect(mapState2Props)(CommentTab);

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'rgb(244,244,244)',
        borderBottomWidth: 1,
    },
    commentImage: {
        height: 20,
        width: 24,
        marginLeft: 13
    },
    commentText: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
        marginLeft: 18
    },
    text1: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
        marginRight: 18
    },
    text2: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
        marginRight: 15
    }
});