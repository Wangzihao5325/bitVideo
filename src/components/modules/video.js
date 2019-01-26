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
        data: [],
        page: 1,
        totalPage: 1
    }

    componentDidMount() {
        let showData = this.props.data.slice(0, this.props.limit);
        let totalPage = Math.ceil(this.props.data.length / this.props.limit);
        this.setState({
            data: showData,
            page: 1,
            totalPage: totalPage
        });
    }

    _moreVideo = () => {
        console.log('more video');
    }

    _haveChange = () => {
        let newPage = this.state.page + 1;
        let newData = [];
        if (newPage > this.state.totalPage) {
            newPage = 1;
        }
        newData = this.props.data.slice((newPage - 1) * this.props.limit, newPage * this.props.limit);
        this.setState({
            page: newPage,
            data: newData
        });
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
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><TextBtn title='更多' btnPress={this._moreVideo} /></View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><TextBtn title='换一换' btnPress={this._haveChange} /></View>
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