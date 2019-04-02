import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableHighlight, ImageBackground } from 'react-native';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';
import PropTypes from 'prop-types';

import SecurtyImage from '../../components/securtyImage/index';

class InnerItem extends PureComponent {

    static contextTypes = {
        subjectNavigation: PropTypes.object
    }

    _press = () => {
        const { subjectNavigation } = this.context;
        subjectNavigation.navigate('VideoModel', { videoId: this.props.item.id });
    }

    render() {
        return (
            <TouchableHighlight style={{ width: 91 + 12, height: 112 + 7 + 17, }} underlayColor='transparent' onPress={this._press}>
                <View style={styles.innterContainer}>
                    <SecurtyImage style={styles.innerImage} imageStyle={{ height: 112, width: 91, borderRadius: 5 }} source={{ uri: this.props.item.cover_path }} />
                    <Text style={{ fontSize: 12, color: 'rgb(187,186,186)', marginTop: 7 }} numberOfLines={1} ellipsizeMode='tail'>{this.props.item.title}</Text>
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
            coverPath: this.props.item.cover_path,
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
                <ImageBackground style={{ position: 'absolute', top: 20, right: 0, height: 27, width: 89, display: 'flex', flexDirection: 'row-reverse', alignItems: 'center' }} source={require('../../image/subject/actor_total.png')}>
                    <Text onPress={this._toActorDetail} style={{ color: 'rgb(254,163,91)', marginRight: 2 }}>{`${videoCount}部影片`}</Text>
                </ImageBackground>
                <View style={styles.titleContainer}>
                    <SecurtyImage style={styles.itemImage} source={{ uri: this.props.item.cover_path }} />
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 16, color: 'rgb(229,187,134)', marginLeft: 14 }}>{this.props.item.name}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 14, color: 'rgb(229,187,134)', marginLeft: 14, marginTop: 2 }}>{this.props.item.intro}</Text>
                    </View>
                </View>
                <FlatList
                    style={{ height: 112 + 7 + 17, width: '100%', marginBottom: 15, marginTop: 20 }}
                    data={this.props.item.list}
                    horizontal={true}
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
        Api.getActerList((e) => {
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
        height: 281,
        width: '100%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgb(133,148,156)'
    },
    titleContainer: {
        height: 60,
        width: Sizes.DEVICE_WIDTH - 15,
        marginLeft: 15,
        marginTop: 35,
        display: 'flex',
        flexDirection: 'row'
    },
    itemImage: {
        height: 60,
        width: 60,
        borderRadius: 30
    },
    innterContainer: {
        width: 91 + 6,
        height: 112 + 7 + 17,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerImage: {
        height: 112,
        width: 91,
        borderRadius: 5

    }
});