import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, Keyboard, Text } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';

import IconBtn from '../../../components/imageBtn/IconBtnWithTitle';

export default class InputBottom extends PureComponent {
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
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder={In18.COMMENT_PLACEHOLDER} />
                {this.state.isKeyboardShow &&
                    <View style={styles.keyboardView}>
                        <Text style={styles.sendText}>{In18.SEND_TEXT}</Text>
                    </View>
                }
                {!this.state.isKeyboardShow &&
                    <View style={styles.noKeyboardView}>
                        <IconBtn flexStyle={{ justifyContent: 'center' }} containerStyle={styles.iconContainerStyle} imageStyle={styles.iconImageStyle} titleStyle={styles.iconTitleStyle} source={require('../../../image/videoDetail/video_share.png')} title={In18.SHARE_TEXT} />
                        <IconBtn flexStyle={{ justifyContent: 'center' }} containerStyle={styles.iconContainerStyle} imageStyle={styles.iconImageStyle} titleStyle={styles.iconTitleStyle} source={require('../../../image/usual/star.png')} title={In18.COLLECTION_TEXT} />
                    </View>
                }
            </View>
        );
    }
}
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