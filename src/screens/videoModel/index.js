import React, { PureComponent } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import store from '../../store/index';
import { set_video_full_data, set_guess_like_source, set_comment_list_data, video_detail_data_reset } from '../../store/actions/videoDetailInfoAction';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';
import { isXDevice } from '../../global/utils/PixelUtil';

import Modal from "react-native-modal";
import ModalHeader from '../loginModel/modalComponent/ModalHeader';
import XSVideo from './videoComponent/video';
import VideoHeader from './videoComponent/videoHeader';
import UsualInfoTab from './videoComponent/usualInfoTab';
import CommentTab from './videoComponent/commentTab';
import SourceTab from './videoComponent/sourceTab';
import EpiscodeTab from './videoComponent/episcodeTab';
import InputBottom from './videoComponent/inputBottom';
import GuessLike from './videoComponent/guessLike';
import AmazingComment from './videoComponent/amazingComment';

export default class VideoModel extends PureComponent {
    state = {
        detailInfoIsVisable: false
    }

    componentDidMount() {
        const videoId = this.props.navigation.getParam('videoId', 'undefine_Id');
        if (videoId !== 'undefine_Id') {
            //获取video信息
            Api.getVideoInfo(videoId, (result, code, message) => {
                if (result) {
                    store.dispatch(set_video_full_data(result));
                } else {
                    console.log(message);
                }
            });
            //根据video id 获取猜你喜欢信息
            Api.getGuessLike(videoId, (result, code, message) => {
                if (result) {
                    store.dispatch(set_guess_like_source(result.data));
                }
            });
            //根据video id 获取评论
            Api.getCommentList(videoId, (result, code, message) => {
                if (result) {
                    store.dispatch(set_comment_list_data(result.data));
                }
            });
        }
    }

    componentWillUnmount() {
        store.dispatch(video_detail_data_reset());
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    _introModelOpen = () => {
        this.setState({ detailInfoIsVisable: true });
    }

    _introModelClose = () => {
        this.setState({ detailInfoIsVisable: false });
    }

    render() {
        //iOS设备适配完毕
        let isX = isXDevice();
        let semiModalStyle = styles.modalIosNormal;
        if (isX) {
            semiModalStyle = styles.modalIosX;
        }
        if (Platform.OS === 'android') {
            semiModalStyle = styles.modalAndroidNormal;
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                {Platform.OS === 'ios' && <ModalHeader title='' goBack={this.goBack} />}
                <XSVideo navi={this.props.navigation} />
                <ScrollView
                    style={styles.scroll}
                    showsVerticalScrollIndicator={false}
                >
                    <VideoHeader toIntro={this._introModelOpen} />
                    <UsualInfoTab />
                    <CommentTab />
                    <SourceTab />
                    <EpiscodeTab />
                    <GuessLike />
                    <AmazingComment />
                </ScrollView>
                <KeyboardAvoidingView behavior='position'>
                    <InputBottom />
                </KeyboardAvoidingView>
                <Modal
                    backdropColor='transparent'
                    isVisible={this.state.detailInfoIsVisable}
                    onBackdropPress={() => this.setState({ detailInfoIsVisable: false })}
                    style={styles.bottomModal}
                >
                    <View style={[semiModalStyle, { backgroundColor: 'white' }]}><Text>half model</Text></View>
                </Modal>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    scroll: {
        // height: Sizes.DEVICE_HEIGHT - 38 - 300 - 50,
        // width: Sizes.DEVICE_WIDTH
        flex: 1
    },
    modalIosX: {
        height: Sizes.DEVICE_HEIGHT - 44 - 38 - 200,//X 44 normal 20
        width: Sizes.DEVICE_WIDTH
    },
    modalIosNormal: {
        height: Sizes.DEVICE_HEIGHT - 20 - 38 - 200,//X 44 normal 20
        width: Sizes.DEVICE_WIDTH
    },
    modalAndroidNormal: {
        height: Sizes.DEVICE_HEIGHT - 20 - 200,//X 44 normal 20
        width: Sizes.DEVICE_WIDTH
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0,
    }
});