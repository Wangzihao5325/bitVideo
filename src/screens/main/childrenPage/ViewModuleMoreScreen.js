import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';

import VideoAvater from '../../../components/imageBtn/VideoAvater';
import ModalHeader from '../../../components/modal/ModalHeader';

export default class ViewModuleMoreScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: [],
        title: ''
    };

    componentDidMount() {
        const moduleId = this.props.navigation.getParam('moduleId', 'undefine_Id');
        const title = this.props.navigation.getParam('title', 'undefine_Id');
        this.setState({
            title: title
        });
        Api.getViewModuleMore(moduleId, 1, 15, (e) => {
            if (e && e.data) {
                this.setState({
                    data: e.data,

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

    _goBack = () => {
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ModalHeader goBack={this._goBack} titleStyle={{ color: 'rgb(255,168,96)' }} backBtnColor='rgb(255,255,255)' title={this.state.title} rightBtnMode='none' />
                    {this.state.data.length > 0 &&
                        <FlatList
                            data={this.state.data}
                            contentContainerStyle={{ alignSelf: 'center' }}
                            columnWrapperStyle={{ marginTop: 20 }}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            renderItem={({ item }) => <VideoAvater isVertical={false} onPress={() => this._videoAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} score={item.score} />}
                        />}
                </SafeAreaView>
            </View>
        );
    }
}