import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { connect } from 'react-redux';
import * as MathUtil from '../../../global/utils/MathUtil';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';

import IconBtn from '../../../components/imageBtn/IconBtn';

class CommentTab extends PureComponent {

    state = {
        isRecommend: false,
        isNegative: false,
        commentSum: '0',
        recommendSum: '0人',
        negativeSum: '0人',
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        let commentSum = 0;
        let recommendSum = 0;
        let negativeSum = 0;
        let isRecommend = false;
        let isNegative = false;
        if (nextProps.fullData) {
            commentSum = nextProps.fullData.comment_sum;
        }
        if (nextProps.recommendAndNegative) {
            recommendSum = nextProps.recommendAndNegative.recommend_sum;
            negativeSum = nextProps.recommendAndNegative.negative_sum;
            isRecommend = nextProps.recommendAndNegative.user_recommend === 0 ? false : true;
            isNegative = nextProps.recommendAndNegative.user_negative === 0 ? false : true
        }
        commentSum = MathUtil.playCountTransform(commentSum);
        recommendSum = MathUtil.commentCountTransform(recommendSum);
        negativeSum = MathUtil.commentCountTransform(negativeSum);
        return {
            commentSum,
            recommendSum,
            negativeSum,
            isRecommend,
            isNegative,
        }
    }

    negativePress = () => {
        console.log('negative!!!');
        if (this.props.fullData) {
            let id = this.props.fullData.id;
            let action = 'negative';
            let stateReg = this.state.isNegative ? 0 : 1;
            Api.postRecommendOrNegative(id, action, stateReg, (e) => {
                if (e) {
                    console.log(e);
                }
            });
        }
    }

    recommendPress = () => {
        console.log('recommend!!!');
        if (this.props.fullData) {
            let id = this.props.fullData.id;
            let action = 'recommend';
            let stateReg = this.state.isNegative ? 0 : 1;
            Api.postRecommendOrNegative(id, action, stateReg, (e) => {
                if (e) {
                    console.log(e);
                }
            });
        }
    }

    render() {
        let recommendImageSource = this.state.isRecommend ? require('../../../image/videoDetail/hand_click.png') : require('../../../image/videoDetail/hand_unClick.png');
        let negativeImageSource = this.state.isNegative ? require('../../../image/videoDetail/hand_click.png') : require('../../../image/videoDetail/hand_unClick.png');
        return (
            <View style={styles.container}>
                <Image style={styles.commentImage} source={require('../../../image/videoDetail/comment.png')} />
                <Text style={styles.commentText}>{`${this.state.commentSum}${In18.COMMENT_TEXT}`}</Text>
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <Text style={styles.text2}>{this.state.recommendSum}</Text>
                    <IconBtn onPress={this.negativePress} style={{ marginRight: 5 }} source={negativeImageSource} height={22} width={22} />
                    <Text style={styles.text1}>{this.state.negativeSum}</Text>
                    <IconBtn onPress={this.recommendPress} style={{ marginRight: 5 }} source={recommendImageSource} height={22} width={22} imageStyle={{ transform: [{ rotate: '180deg' }] }} />
                </View>
            </View>
        );
    }
}
function mapState2Props(store) {
    return {
        fullData: store.videoDeatilInfo.fullData,
        recommendAndNegative: store.videoDeatilInfo.recommendAndNegative
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