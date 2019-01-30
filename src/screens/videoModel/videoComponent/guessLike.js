import React, { PureComponent } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
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
                {this.props.data &&
                    <FlatList
                        horizontal={true}
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
    }
});