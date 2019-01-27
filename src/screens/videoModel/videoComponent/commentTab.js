import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import * as MathUtil from '../../../global/utils/MathUtil';
import * as In18 from '../../../global/In18';

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
        height: 70,
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
        color: 'rgb(151,151,151)'
    }
});