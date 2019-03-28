import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, View, Text, ImageBackground, Image, FlatList } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';

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
            console.log(e);
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

    render() {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView style={{ backgroundColor: Colors.SCREEN_BGCOLOR }} >
                    {this.state.coverPath.length > 0 &&
                        <ImageBackground style={{ width: Sizes.DEVICE_WIDTH, height: 0.3 * Sizes.DEVICE_HEIGHT }} source={{ uri: this.state.coverPath }}>
                            <Image resizeMode='contain' style={{ position: 'absolute', left: 0, bottom: -1, width: Sizes.DEVICE_WIDTH, height: Sizes.DEVICE_WIDTH / 6.8 }} source={require('../../../image/subject/model.png')} />
                        </ImageBackground>
                    }
                    <View style={{ height: 100, width: '100%', marginTop: 20 }}>
                        <View style={{ height: 20, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            {/* <Image style={{height}}/> */}
                            <Text style={{ fontSize: 16, color: 'white', marginLeft: 15 }}>{this.state.name}</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={{ height: 40, width: Sizes.DEVICE_WIDTH - 90, lineHeight: 20, fontSize: 14, color: 'rgb(178,178,178)' }}>{this.state.intro}</Text>
                        </View>
                    </View>

                    {this.state.data.length > 0 &&
                        <FlatList
                            style={{ height: Sizes.DEVICE_HEIGHT, width: Sizes.DEVICE_WIDTH }}
                            onRefresh={this._flatListRefresh}
                            refreshing={false}
                            onEndReached={this._getNextPageData}
                            onEndReachedThreshold={0.1}
                            data={this.state.data}
                            contentContainerStyle={{ alignSelf: 'center' }}
                            columnWrapperStyle={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            renderItem={({ item }) => <VideoAvater isVertical={true} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                        />}
                </ScrollView>
            </View>
        );
    }
}