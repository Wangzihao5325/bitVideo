import React, { PureComponent } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight } from 'react-native';

import VideoAvater from '../imageBtn/VideoAvater';
import TitleHeader from '../../components/titleHeader/index';

class TextBtn extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.btn} underlayColor='transparent' onPress={this.props.btnPress}>
                <Text style={styles.btnText}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}
class SUDOKU extends PureComponent {
    state = {
        data: []
    }

    static getDerivedStateFromProps(props, state) {
        let showData = props.data.slice(0, props.limit);
        return {
            data: showData
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', paddingBottom: 3 }}>
                <TitleHeader style={{ marginTop: 20 }} imageSource={require('../../image/main/global_movie.png')} title={this.props.title} />
                <FlatList
                    horizontal={false}
                    numColumns={this.props.lineNum}
                    data={this.state.data}
                    renderItem={({ item }) => <VideoAvater isVertical={this.props.isVertical} onPress={() => this.movieAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} />}
                    columnWrapperStyle={{ marginTop: 20 }}
                />
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><TextBtn title='更多' btnPress={() => console.log('111')} /></View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><TextBtn title='换一换' btnPress={() => console.log('222')} /></View>
                </View>
            </View>
        );
    }
}
// class GUNDONG extends PureComponent {

// }
export default class VideoModule extends PureComponent {
    render() {
        if (this.props.clientStyle == 's_video_sudoku_3') {
            return (<SUDOKU data={this.props.data} limit={this.props.limit} lineNum={3} isVertical={true} title={this.props.title} />);
        }
        if (this.props.clientStyle == 's_video_sudoku_2') {
            return (<SUDOKU data={this.props.data} limit={this.props.limit} lineNum={2} isVertical={false} title={this.props.title} />);
        }
        if (this.props.clientStyle == 's_video_gundong_shu') {
            // return (<GUNDONG data={this.props.data} isVertical={true} />);
        }
        if (this.props.clientStyle == 's_video_gundong_heng') {
            // return (<GUNDONG data={this.props.data} isVertical={false} />);
        }
    }
}

const styles = StyleSheet.create({
    btn: {
        height: 40,
        width: 170,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(239,244,247)'
    },
    btnText: {
        color: 'rgb(187,186,186)',
        fontSize: 14
    }
});