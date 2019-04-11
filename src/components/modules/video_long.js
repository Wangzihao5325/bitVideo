import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import * as Sizes from '../../global/Sizes';
import SecurtyImage from '../../components/securtyImage/index';
import TitleHeader from '../../components/titleHeader/index';
import { FlatList } from 'react-native-gesture-handler';

const HEIGHT = Sizes.DEVICE_WIDTH / 1.9;
const WIDTH = Sizes.DEVICE_WIDTH;

class Item extends PureComponent {

    btnOnPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback style={styles.ItemContainer} onPress={this.btnOnPress}>
                <View style={styles.ItemContainer}>
                    <View style={[styles.Image, { display: 'flex' }]}>
                        {/* <View style={styles.ImageBottom}>
                            <Image style={styles.goodImage} source={require('../../image/main/good.png')} />
                            <Text style={styles.goodText}>{this.props.item.score}</Text>
                            <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                                <Text style={styles.timesText}>{`${this.props.item.play_count}次播放`}</Text>
                            </View>
                        </View> */}
                        <SecurtyImage default={require('../../image/usual/banner_load_failed.png')} style={styles.Image} source={{ uri: this.props.item.cover_path }} />
                    </View>
                    <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{this.props.item.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default class VideoLong extends PureComponent {
    state = {
        data: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let showData = [];
        if (nextProps.data.length > nextProps.limit) {
            showData = nextProps.data.slice(0, nextProps.limit);
            return {
                data: showData
            }
        } else {
            showData = nextProps.data;
            return {
                data: showData
            }
        }

    }

    _videoAvaterOnPress = (id) => {
        if (this.props.navi) {
            this.props.navi.navigate('VideoModel', { videoId: id });
        }
    }

    _moreVideo = () => {
        //console.log('more video');
        this.props.navi.navigate('ViewModuleMoreScreen', { moduleId: this.props.moduleId, title: this.props.title });
    }

    render() {
        return (
            <View>
                <TitleHeader
                    style={{ marginTop: 10 }}
                    imageSource={require('../../image/main/module_header.png')}
                    title={this.props.title}
                    btnTitle='更多'
                    showMore={this._moreVideo} />
                <FlatList
                ItemSeparatorComponent={()=><View style={{height:20,width:'100%'}}/>}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} onPress={() => this._videoAvaterOnPress(item.id)} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ItemContainer: {
        height: HEIGHT + 50,
        width: WIDTH,
        display: 'flex'
    },
    Image: {
        height: HEIGHT,
        width: WIDTH
    },
    ImageBottom: {
        height: 42,
        width: WIDTH,
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        bottom: 0,
        left: 0,
        display: 'flex',
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        marginHorizontal: 15,
        fontSize: 16,
        lineHeight: 29,
        marginTop: 12,
        color: 'rgb(187,187,186)'
    },
    goodImage: {
        height: 20,
        width: 20,
        marginLeft: 22
    },
    goodText: {
        fontSize: 21,
        lineHeight: 31,
        color: 'rgb(253,187,134)',
        marginLeft: 10
    },
    timesText: {
        fontSize: 18,
        lineHeight: 29,
        color: 'rgb(207,207,207)',
        marginRight: 19
    }
});