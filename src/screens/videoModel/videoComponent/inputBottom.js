import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, Keyboard, Text } from 'react-native';
import { connect } from 'react-redux';
import store from '../../../store/index';
import { video_detail_add_myself_comment, change_video_collect_state } from '../../../store/actions/videoDetailInfoAction';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';

import IconBtn from '../../../components/imageBtn/IconBtnWithTitle';

const reg = { input: '' };
class InputBottom extends PureComponent {
    state = {
        isKeyboardShow: false
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
        reg.input = '';
    }

    _keyboardDidShow = () => {
        this.setState({
            isKeyboardShow: true
        });
    }

    _keyboardDidHide = () => {
        this.setState({
            isKeyboardShow: false
        });
        if (this.input) {
            this.input.clear();
            reg.input = '';
        }
    }

    textChange = (e) => {
        reg.input = e;
    }

    sendComment = () => {
        if (reg.input && reg.input !== '') {
            Api.postAddComment(
                this.props.id,
                this.props.globalType,
                reg.input,
                (result, code, message) => {
                    if (result) {
                        store.dispatch(video_detail_add_myself_comment(result));
                        this.input.blur();
                    }
                });
        } else {
            console.log('请输入内容！')
        }
    }

    _collectVideo = () => {
        if (this.props.collectState) {
            Api.postCancelCollect(
                this.props.id,
                (result, code, message) => {
                    if (message == 'success') {
                        store.dispatch(change_video_collect_state(false));
                    }
                });
        } else {
            Api.postAddCollect(
                this.props.globalType,
                this.props.id,
                (result, code, message) => {
                    if (message == 'success') {
                        store.dispatch(change_video_collect_state(true));
                    }
                });
        }
    }

    render() {
        let collectImageSource = this.props.collectState ? require('../../../image/usual/star_collect.png') : require('../../../image/usual/star.png');
        return (
            <View style={styles.container}>
                <TextInput onChangeText={this.textChange} ref={(ref) => this.input = ref} style={styles.input} placeholder={In18.COMMENT_PLACEHOLDER} />
                {this.state.isKeyboardShow &&
                    <View style={styles.keyboardView}>
                        <Text onPress={this.sendComment} style={styles.sendText}>{In18.SEND_TEXT}</Text>
                    </View>
                }
                {!this.state.isKeyboardShow &&
                    <View style={styles.noKeyboardView}>
                        <IconBtn flexStyle={{ justifyContent: 'center' }} containerStyle={styles.iconContainerStyle} imageStyle={styles.iconImageStyle} titleStyle={styles.iconTitleStyle} source={require('../../../image/videoDetail/video_share.png')} title={In18.SHARE_TEXT} />
                        <IconBtn flexStyle={{ justifyContent: 'center' }} containerStyle={styles.iconContainerStyle} imageStyle={styles.iconImageStyle} titleStyle={styles.iconTitleStyle} source={collectImageSource} title={In18.COLLECTION_TEXT} onPress={this._collectVideo} />
                    </View>
                }
            </View>
        );
    }
}
function mapState2Props(store) {
    return {
        id: store.videoDeatilInfo.id,
        globalType: store.videoDeatilInfo.globalType,
        collectState: store.videoDeatilInfo.isCollect,
    }
}

export default connect(mapState2Props)(InputBottom);

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    input: {
        height: 30,
        width: Sizes.DEVICE_WIDTH - 80,
        borderColor: 'rgb(242,242,242)',
        borderWidth: 1,
        marginLeft: 10
    },
    keyboardView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    sendText: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        fontWeight: 'bold'
    },
    noKeyboardView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    iconContainerStyle: {
        height: 40,
        width: 30
    },
    iconImageStyle: {
        height: 18,
        width: 18
    },
    iconTitleStyle: {
        fontSize: 8
    }
});