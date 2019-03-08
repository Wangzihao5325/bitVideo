import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Platform, FlatList } from 'react-native';
import Api from '../../../socket/index';

import ModalHeader from '../../../screens/loginModel/modalComponent/ModalHeader';
import RootPlayer from '../../../components/player/RootPlayer';
import GuessLikeItem from './GuessLikeItem';

import shortVideoGuessLike from '../../../mock/shortVideoGuessLike';

//http://youku.com-www-163.com/20180506/576_bf997390/index.m3u8
export default class ShortVideoDetail extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        url: null,
        id: '',
        title: '',
        times: '',
        guessLikeList: []
    }

    componentDidMount() {
        const shortVideoUrl = this.props.navigation.getParam('ShortVideoUrl', '');
        const id = this.props.navigation.getParam('id', '');
        const title = this.props.navigation.getParam('title', '');
        const times = this.props.navigation.getParam('times', '');
        this.setState({
            url: shortVideoUrl,
            id: id,
            title: title,
            times: times
        });
        Api.getShortVideoGuessLike(id, (e) => {
            if (e.data.length > 0) {
                this.setState({
                    guessLikeList: e.data
                });
            } else {
                //mock数据
                this.setState({
                    guessLikeList: shortVideoGuessLike
                });
            }
        })
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {Platform.OS === 'ios' && <ModalHeader title='' goBack={this.goBack} />}
                <RootPlayer navi={this.props.navigation} videoUrl={this.state.url} />
                {this.state.guessLikeList.length > 0 &&
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.guessLikeList}
                        renderItem={({ item }) => <GuessLikeItem title={item.title} times={item.play_count} uri={item.cover_path} id={item.id} playUrl={item.play_url} />}
                    />
                }
            </SafeAreaView>
        );
    }
}