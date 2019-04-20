import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View, Text, ImageBackground, Image, FlatList, TouchableHighlight, Platform } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import VectorIconBtn from '../../../components/imageBtn';
import { naviToVideoService } from '../../../screens/videoModel/VideoService';

import SecurtyImage from '../../../components/securtyImage/index';
import VideoAvater from '../../../components/imageBtn/VideoAvater';

export default class ActorDetail extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        id: '',
        coverPath: '',
        name: '',
        intro: '',
        data: [],
    };

    componentDidMount() {
        const id = this.props.navigation.getParam('id', '');
        const coverPath = this.props.navigation.getParam('coverPath', '');
        const name = this.props.navigation.getParam('name', '');
        const intro = this.props.navigation.getParam('intro', '');
        this.setState({
            id,
            coverPath,
            name,
            intro
        });

        Api.getActorDetails(id, 1, 15, (e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    data: e.data,
                    page: e.current_page,
                    lastPage: e.last_page
                });
            }
        });
    }

    _videoAvaterOnPress = (id) => {
        this.props.navigation.navigate('VideoModel', { videoId: id });
        //naviToVideoService(id);

    }

    _flatListRefresh = () => {
        Api.getActorDetails(this.state.id, 1, 15, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data,
                    page: e.current_page,
                    lastPage: e.last_page
                });
            }
        });
    }

    _getNextPageData = () => {
        if (this.state.page !== this.state.lastPage) {
            Api.getActorDetails(this.state.id, this.state.page + 1, 15, (e) => {
                if (Array.isArray(e.data)) {
                    this.setState((preState, props) => {
                        let newList = preState.data.concat(e.data);
                        return {
                            data: newList,
                            page: e.current_page,
                            totalPage: e.last_page
                        }
                    });
                }
            });
        }
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        let btnHeight = Platform.OS == 'ios' ? 45 : 15;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: Colors.SCREEN_BGCOLOR }} >
                    <TouchableHighlight underlayColor='transparent' onPress={this._goBack} style={{ position: 'absolute', top: btnHeight, left: 15, height: 22, width: 22, zIndex: 10 }}><Image style={{ height: 22, width: 22, transform: [{ rotate: '180deg' }] }} source={require('../../../image/mine/message_left_arrow.png')} /></TouchableHighlight>
                    {(typeof this.state.coverPath == 'string' && this.state.coverPath.length > 0) ?
                        <View style={{ width: Sizes.DEVICE_WIDTH, height: 0.3 * Sizes.DEVICE_HEIGHT, display: 'flex' }}>
                            <SecurtyImage default={require('../../../image/usual/banner_load_failed.png')} style={{ width: Sizes.DEVICE_WIDTH, height: 0.3 * Sizes.DEVICE_HEIGHT }} source={{ uri: this.state.coverPath }} />
                            <Image resizeMode='contain' style={{ position: 'absolute', left: 0, bottom: -1, width: Sizes.DEVICE_WIDTH, height: Sizes.DEVICE_WIDTH / 6.8 }} source={require('../../../image/subject/model.png')} />
                        </View> :
                        <ImageBackground style={{ width: Sizes.DEVICE_WIDTH, height: 0.3 * Sizes.DEVICE_HEIGHT }} source={require('../../../image/usual/banner_load_failed.png')}>
                            <Image resizeMode='contain' style={{ position: 'absolute', left: 0, bottom: -1, width: Sizes.DEVICE_WIDTH, height: Sizes.DEVICE_WIDTH / 6.8 }} source={require('../../../image/subject/model.png')} />
                        </ImageBackground>
                    }
                    <View style={{ height: 100, width: '100%', marginTop: 20 }}>
                        <View style={{ height: 20, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Image style={{height}}/> */}
                            <Text style={{ fontSize: 16, color: 'white', marginLeft: 15 }}>{this.state.name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ height: 40, width: Sizes.DEVICE_WIDTH - 30, lineHeight: 20, fontSize: 14, color: 'rgb(178,178,178)' }}>{this.state.intro}</Text>
                        </View>
                    </View>

                    {this.state.data.length > 0 &&
                        <FlatList
                            style={{ height: Sizes.DEVICE_HEIGHT + 20, width: Sizes.DEVICE_WIDTH, alignSelf: 'center' }}
                            onRefresh={this._flatListRefresh}
                            refreshing={false}
                            onEndReached={this._getNextPageData}
                            onEndReachedThreshold={1}
                            data={this.state.data}
                            columnWrapperStyle={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            renderItem={({ item }) => <VideoAvater isVertical={false} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                        />}
                </ScrollView>
            </View>
        );
    }
}