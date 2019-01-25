import React, { PureComponent } from 'react';
import { View, SafeAreaView } from 'react-native';
import Api from '../../socket/index';

import ModalHeader from '../loginModel/modalComponent/ModalHeader';

export default class VideoModel extends PureComponent {
    componentDidMount() {
        const videoId = this.props.navigation.getParam('videoId', 'undefine_Id');
        console.log('kkkkkkkkkkk');
        console.log(videoId);
        if (videoId !== 'undefine_Id') {
            Api.getVideoInfo(videoId, (result, code, message) => {
                console.log(message);
                console.log('12345678');
            });
        }
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title='test' goBack={this.goBack} />
            </SafeAreaView>
        );
    }
}