import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, Text, ImageBackground } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';

const reg = { title: '', contact: '' };
export default class HelpScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.HELP_SUBMIT,  //header标题
            headerStyle: {
                borderBottomColor: Colors.SCREEN_BGCOLOR,
                backgroundColor: Colors.SCREEN_BGCOLOR
            },
            headerTintColor: Colors.NAVI_ACTIVE_TINT_COLOR,
        }
    };

    componentWillUnmount() {
        reg.title = '';
        reg.contact = '';
    }

    submit = () => {
        Api.postFeedback(reg.title, reg.contact, (result, code, message) => {
            if (message == 'success') {
                this.props.navigation.pop();
            }
        });
    }

    _titleInputChange = (e) => {
        reg.title = e;
    }

    _contentInputChange = (e) => {
        reg.contact = e;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexView}>
                    <TextInput
                        style={styles.mainInput}
                        placeholder={In18.PLEASE_INPUT_SUGGEST}
                        placeholderTextColor='rgb(37,19,4)'
                        multiline={true}
                        maxLength={150}
                        onChangeText={this._titleInputChange}
                    />
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
                        underlayColor='#909090'
                        onPress={this.submit}
                    >
                        <Text style={styles.btnText}>{In18.SUBMIT_SUGGEXT}</Text>
                    </TouchableHighlight>
                </ImageBackground>
            </View>
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
        height: 119,
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
    mainInput: {
        height: 119 - 40,
        width: Sizes.DEVICE_WIDTH - 30 - 40,
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
        height: 20,
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