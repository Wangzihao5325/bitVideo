import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Api from '../../../socket/index';

import VideoAvater from '../../../components/imageBtn/VideoAvater';

export default class ViewModuleMoreScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
        };
    };

    state = {
        data: []
    };

    componentDidMount() {
        const moduleId = this.props.navigation.getParam('moduleId', 'undefine_Id');
        Api.getViewModuleMore(moduleId, 1, 15, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data
                });
            }
        })
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _videoAvaterOnPress = (id) => {
        this.props.navigation.navigate('VideoModel', { videoId: id });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {this.state.data.length > 0 &&
                    <FlatList
                        data={this.state.data}
                        contentContainerStyle={{ alignSelf: 'center' }}
                        columnWrapperStyle={{ marginTop: 20 }}
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        renderItem={({ item }) => <VideoAvater isVertical={true} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                    />}
            </SafeAreaView>
        );
    }
}