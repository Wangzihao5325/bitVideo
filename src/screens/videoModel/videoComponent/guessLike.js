import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import store from '../../../store/index';
import { set_video_full_data, set_guess_like_source } from '../../../store/actions/videoDetailInfoAction';

import VideoAvater from '../../../components/imageBtn/VideoAvater';

class GuessLike extends PureComponent {

    _videoAvaterOnPress = (id) => {
        //获取video信息
        Api.getVideoInfo(id, (result, code, message) => {
            if (result) {
                store.dispatch(set_video_full_data(result));
            } else {
                console.log(message);
            }
        });
        //根据video id 获取猜你喜欢信息
        Api.getGuessLike(id, (result, code, message) => {
            if (result) {
                store.dispatch(set_guess_like_source(result.data));
            }
        });
    }

    render() {
        console.log('____this is reducer data_____!!!');
        console.log(this.props.data);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>{In18.GUESS_LIKE}</Text>
                </View>
                {this.props.data &&
                    <FlatList
                        style={styles.FlatList}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.props.data}
                        renderItem={({ item }) => <VideoAvater isVertical={true} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                    />
                }
            </View>
        );
    }
}
function mapState2Props(store) {
    return {
        data: store.videoDeatilInfo.guessLike
    }
}

export default connect(mapState2Props)(GuessLike);

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    header: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        marginLeft: 10,
        color: 'rgb(54,54,54)',
        fontSize: 16,
        fontWeight: 'bold'
    },
    FlatList: {
        marginTop: 5,
        marginBottom: 10
    }
});