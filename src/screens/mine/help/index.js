import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, Text, ImageBackground, SafeAreaView } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import ModalHeader from '../../../components/modal/ModalHeader';
import ToastRoot from '../../../components/toast/index';

const reg = { title: '', contact: '' };
export default class HelpScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        leftWords: 200
    };

    componentWillUnmount() {
        reg.title = '';
        reg.contact = '';
    }

    submit = () => {
        Api.postFeedback(reg.title, reg.contact, (result, code, message) => {
            if (message == 'success') {
                ToastRoot.show('反馈成功');
                this.props.navigation.pop();
            }
        });
    }

    _titleInputChange = (e) => {
        reg.title = e;
        let left = 200
        if (e) {
            left = 200 - e.length;
        }
        this.setState({
            leftWords: left
        })
    }

    _contentInputChange = (e) => {
        reg.contact = e;
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this._goBack} backBtnColor='rgb(255,255,255)' title='在线反馈' rightBtnMode='none' />
                <View style={styles.flexView}>
                    <TextInput
                        style={styles.mainInput}
                        placeholder={In18.PLEASE_INPUT_SUGGEST}
                        placeholderTextColor='rgb(37,19,4)'
                        multiline={true}
                        maxLength={200}
                        onChangeText={this._titleInputChange}
                    />
                    <Text style={{ alignSelf: 'flex-end', marginRight: 10 }}>{`${this.state.leftWords}/200`}</Text>
                </View>
                <View style={styles.flexView2}>
                    <TextInput
                        style={styles.input2}
                        placeholder={In18.PLEASE_INPUT_CONTRACT}
                        placeholderTextColor='rgb(37,19,4)'
                        maxLength={20}
                        onChangeText={this._contentInputChange}
                    />
                </View>
                <ImageBackground style={styles.btnBg} source={require('../../../image/mine/feedback_btn_bg.png')}>
                    <TouchableHighlight
                        style={styles.btn}
                        underlayColor='transparent'
                        onPress={this.submit}
                    >
                        <Text style={styles.btnText}>{In18.SUBMIT_SUGGEXT}</Text>
                    </TouchableHighlight>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SCREEN_BGCOLOR
    },
    flexView: {
        marginTop: 40,
        display: 'flex',
        height: 199,
        width: Sizes.DEVICE_WIDTH - 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgb(255,216,169)',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    mainInput: {
        height: 199 - 40,
        width: Sizes.DEVICE_WIDTH - 30 - 40,
        textAlignVertical: 'top',
        alignSelf: 'center'
    },
    flexView2: {
        marginTop: 20,
        display: 'flex',
        height: 60,
        width: Sizes.DEVICE_WIDTH - 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,216,169)',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    input2: {
        height: 40,
        width: Sizes.DEVICE_WIDTH - 30 - 40,
    },
    btnBg: {
        height: 40,
        width: Sizes.DEVICE_WIDTH - 42 - 58,
        marginTop: 40,
        marginLeft: 42,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'rgb(50,30,13)',
        fontSize: 16
    }
});