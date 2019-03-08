import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Platform } from 'react-native';

import ModalHeader from '../../../screens/loginModel/modalComponent/ModalHeader';
import RootPlayer from '../../../components/player/RootPlayer';

//http://youku.com-www-163.com/20180506/576_bf997390/index.m3u8
export default class ShortVideoDetail extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        url: null
    }

    componentDidMount() {
        const shortVideoUrl = this.props.navigation.getParam('ShortVideoUrl', '');
        this.setState({
            url: shortVideoUrl
        });
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {Platform.OS === 'ios' && <ModalHeader title='' goBack={this.goBack} />}
                <RootPlayer navi={this.props.navigation} videoUrl={this.state.url} />
            </SafeAreaView>
        );
    }
}