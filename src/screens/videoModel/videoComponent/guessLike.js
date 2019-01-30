import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';

import VideoAvater from '../../../components/imageBtn/VideoAvater';

class GuessLike extends PureComponent {

    _videoAvaterOnPress = (id) => {
        console.log(`go to ${id}`);
    }

    render() {
        console.log('____this is reducer data_____!!!');
        console.log(this.props.data);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>猜你喜欢</Text>
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