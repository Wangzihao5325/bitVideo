import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, ImageBackground } from 'react-native';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';
import PropTypes from 'prop-types';
import { naviToVideoService } from '../../screens/videoModel/VideoService';


import SecurtyImage from '../../components/securtyImage/index';

const hoWidth = (Sizes.DEVICE_WIDTH - 4) / 2.5;
const hoHeight = hoWidth / 1.5;

class InnerItem extends PureComponent {

    static contextTypes = {
        subjectNavigation: PropTypes.object
    }

    _press = () => {
        // const { subjectNavigation } = this.context;
        // subjectNavigation.navigate('VideoModel', { videoId: this.props.item.id });
        naviToVideoService(this.props.item.id);

    }

    render() {
        return (
            <TouchableHighlight style={{ width: hoWidth, height: hoHeight + 30, }} underlayColor='transparent' onPress={this._press}>
                <View style={styles.innterContainer}>
                    <SecurtyImage style={styles.innerImage} default={require('../../image/usual/image_load_failed_ho.png')} source={{ uri: this.props.item.cover_path }} />
                    <Text style={{ fontSize: 12, color: 'rgb(187,186,186)', marginTop: 7, marginHorizontal: 3 }} numberOfLines={1} ellipsizeMode='tail'>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

class Item extends PureComponent {

    static contextTypes = {
        subjectNavigation: PropTypes.object
    }

    _toActorDetail = () => {
        const { subjectNavigation } = this.context;
        subjectNavigation.navigate('ActorDetailScreen', {
            id: this.props.item.actor_id,
            coverPath: this.props.item.cover_big_oss_filename,//cover_path
            name: this.props.item.name,
            intro: this.props.item.intro,
        });
    }

    render() {
        let videoCount = this.props.item.video_count;
        if (!this.props.item.video_count) {
            videoCount = '0'
        }
        if (this.props.item.video_count > 999) {
            videoCount = '999+'
        }
        return (
            <View style={styles.itemContainer}>
                <ImageBackground style={{ position: 'absolute', top: 0, right: 0, height: 27, width: 89, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }} source={require('../../image/subject/actor_total.png')}>
                    <Text onPress={this._toActorDetail} style={{ color: 'rgb(254,163,91)', marginRight: 2 }}>{`${videoCount}部影片`}</Text>
                </ImageBackground>
                <View style={styles.titleContainer}>
                    <TouchableHighlight style={styles.itemImage} underlayColor='transparent' onPress={this._toActorDetail}>
                        <SecurtyImage style={styles.itemImage} source={{ uri: this.props.item.cover_path }} />
                    </TouchableHighlight>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: 'rgb(229,187,134)', marginLeft: 14 }}>{this.props.item.name}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, color: 'rgb(229,187,134)', marginLeft: 14, marginTop: 2 }}>{this.props.item.intro}</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: hoHeight + 30, width: '100%', marginTop: 15 }}
                    data={this.props.item.list}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => <InnerItem key={index} item={item} />}
                />
            </View>
        );
    }
}

export default class HotActor extends PureComponent {
    state = {
        data: []
    };

    componentDidMount() {
        Api.getActerList('info', 1, 5, (e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    data: e.data
                });
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}
                    renderItem={({ item, index }) => <Item key={index} item={item} />
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 241,
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgb(133,148,156)'
    },
    titleContainer: {
        height: 60,
        width: Sizes.DEVICE_WIDTH - 15,
        marginLeft: 15,
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row'
    },
    itemImage: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    innterContainer: {
        // width: 91 + 6,
        // height: 112 + 7 + 17,
        // display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImage: {
        // height: 112,
        // width: 91,
        // borderRadius: 5
        height: hoHeight,
        width: hoWidth - 2,
        marginHorizontal: 1,
        borderRadius: 5
    }
});