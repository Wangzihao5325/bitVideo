import React, { PureComponent } from 'react';
import { SafeAreaView, View, StyleSheet, Image, Text, FlatList } from 'react-native';
import * as In18 from '../../global/In18';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';

import VideoAvater from '../../components/imageBtn/VideoAvater';

class Header extends PureComponent {
    render() {
        return (
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={{ uri: this.props.source }} />
                <View style={styles.introContainer}>
                    <Text style={styles.introText}>
                        {this.props.text}
                    </Text>
                </View>
            </View>
        );
    }
}

export default class SubjectDetailScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),  //header标题
        }
    };

    state = {
        introImage: '',
        intro: '',
        dataList: [],
        nowPage: -1,
        lastPage: -1,
        id: -1,
    }

    componentDidMount() {
        const subjectId = this.props.navigation.getParam('subjectId', 'undefined_id');
        const introImage = this.props.navigation.getParam('introImage', 'undefined_url');
        const intro = this.props.navigation.getParam('intro', 'undefined_text');
        if (introImage !== 'undefined_url' && intro !== 'undefined_text') {
            this.setState({
                introImage: introImage,
                intro: intro,
                id: subjectId
            });
        }
        if (subjectId !== 'undefined_id') {
            Api.getNewSubjectDetail(subjectId, 1, 15, (e) => {
                this.setState({
                    dataList: e.data,
                    nowPage: e.current_page,
                    lastPage: e.last_page
                });
            });
        }
    }

    _videoAvaterOnPress = (id) => {
        this.props.navigation.navigate('VideoModel', { videoId: id });
    }

    _onRefresh = () => {
        Api.getNewSubjectDetail(this.state.id, 1, 15, (e) => {
            this.setState({
                dataList: e.data,
                nowPage: e.current_page,
                lastPage: e.last_page
            });
        });
    }

    _onEndReached = () => {
        if (this.state.nowPage < this.state.lastPage) {
            Api.getNewSubjectDetail(this.state.id, this.state.nowPage + 1, 15, (e) => {
                if (e) {
                    this.setState((preState) => {
                        let newDataList = preState.dataList.concat(e.data);
                        return {
                            dataList: newDataList,
                            nowPage: e.current_page,
                            lastPage: e.last_page
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(250,250,250)' }}>
                {this.state.introImage !== '' && <Header source={this.state.introImage} text={this.state.intro} />}
                <FlatList
                    onRefresh={this._onRefresh}
                    refreshing={false}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}
                    contentContainerStyle={{ alignItems: 'center' }}
                    horizontal={false}
                    numColumns={3}
                    data={this.state.dataList}
                    columnWrapperStyle={{ marginTop: 10 }}
                    renderItem={({ item }) => <VideoAvater isVertical={true} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 310,
        width: Sizes.DEVICE_WIDTH,
        backgroundColor: 'rgb(250,250,250)'
    },
    headerImage: {
        height: 260,
        width: Sizes.DEVICE_WIDTH
    },
    introContainer: {
        width: Sizes.DEVICE_WIDTH - 20,
        height: 100,
        position: 'absolute',
        left: 10,
        bottom: 0,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    introText: {
        fontSize: 14,
        color: '#909090',
        marginHorizontal: 5
    }
});