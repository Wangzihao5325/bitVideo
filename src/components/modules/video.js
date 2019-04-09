import React, { PureComponent } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableHighlight, ImageBackground } from 'react-native';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

import VideoAvater from '../imageBtn/VideoAvater';
import TitleHeader from '../../components/titleHeader/index';

class TextBtn extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.btn} underlayColor='transparent' onPress={this.props.btnPress}>
                <ImageBackground style={styles.btn} source={require('../../image/main/btn_bg.png')}>
                    <Text style={styles.btnText}>{this.props.title}</Text>
                </ImageBackground>
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

    static getDerivedStateFromProps(nextProps, prevState) {
        let showData = [];
        let totalPage = Math.ceil(nextProps.data.length / nextProps.limit);
        if (prevState.page <= totalPage) {
            showData = nextProps.data.slice((prevState.page - 1) * nextProps.limit, prevState.page * nextProps.limit);
            return {
                data: showData,
                totalPage: totalPage
            }
        } else {
            showData = nextProps.data.slice(0, nextProps.limit);
            return {
                data: showData,
                totalPage: totalPage,
                page: 1
            }
        }

    }

    _moreVideo = () => {
        //console.log('more video');
        this.props.navi.navigate('ViewModuleMoreScreen', { moduleId: this.props.moduleId, title: this.props.title });
    }

    _haveChange = () => {
        let newPage = this.state.page + 1;
        if (newPage > this.state.totalPage) {
            newPage = 1;
        }
        this.setState({
            page: newPage,
        });
    }

    _videoAvaterOnPress = (id) => {
        if (this.props.navi) {
            this.props.navi.navigate('VideoModel', { videoId: id });
        }
    }

    render() {
        return (
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }} >
                <TitleHeader style={{ marginTop: 10 }} imageSource={require('../../image/main/module_header.png')} title={this.props.title} />
                <FlatList
                    horizontal={false}
                    numColumns={this.props.lineNum}
                    data={this.state.data}
                    renderItem={({ item }) => <VideoAvater isVertical={this.props.isVertical} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                    columnWrapperStyle={{ marginTop: 10 }}
                />
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><TextBtn title={In18.MORE_TEXT} btnPress={this._moreVideo} /></View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><TextBtn title={In18.CHANGE_VIDEOS} btnPress={this._haveChange} /></View>
                </View>
            </View>
        );
    }
}
class GUNDONG extends PureComponent {

    _videoAvaterOnPress = (id) => {
        if (this.props.navi) {
            this.props.navi.navigate('VideoModel', { videoId: id });
        }
    }

    _showMore = () => {
        this.props.navi.navigate('ViewModuleMoreScreen', { moduleId: this.props.moduleId, title: this.props.title });
    }

    render() {
        let flatlistStyle = this.props.isVertical ? { height: Sizes.IMAGE_AVATER_VER_HEIGHT + 50, width: Sizes.DEVICE_WIDTH } : {height: Sizes.IMAGE_AVATER_HO_HEIGHT + 50, width: Sizes.DEVICE_WIDTH};
        return (
            <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <TitleHeader showMore={this._showMore} style={{ marginTop: 10, marginBottom: 10 }} imageSource={require('../../image/main/module_header.png')} title={this.props.title} btnTitle={In18.MORE_TEXT} />
                <FlatList
                    style={flatlistStyle}
                    horizontal={true}
                    data={this.props.data}
                    renderItem={({ item }) => <VideoAvater isVertical={this.props.isVertical} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                />
            </View>
        );
    }
}
export default class VideoModule extends PureComponent {
    render() {
        if (this.props.clientStyle == 's_video_sudoku_3') {
            return (<SUDOKU moduleId={this.props.moduleId} data={this.props.data} limit={this.props.limit} lineNum={3} isVertical={true} title={this.props.title} navi={this.props.navi} />);
        }
        if (this.props.clientStyle == 's_video_sudoku_2') {
            return (<SUDOKU moduleId={this.props.moduleId} data={this.props.data} limit={this.props.limit} lineNum={2} isVertical={false} title={this.props.title} navi={this.props.navi} />);
        }
        if (this.props.clientStyle == 's_video_gundong_shu') {
            return (<GUNDONG moduleId={this.props.moduleId} data={this.props.data} title={this.props.title} isVertical={true} navi={this.props.navi} />);
        }
        if (this.props.clientStyle == 's_video_gundong_heng') {
            return (<GUNDONG moduleId={this.props.moduleId} data={this.props.data} title={this.props.title} isVertical={false} navi={this.props.navi} />);
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
    },
    btnText: {
        color: 'rgb(255,255,255)',
        fontSize: 14,
    }
});