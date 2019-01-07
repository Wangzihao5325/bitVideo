import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, Text } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';

export default class HelpScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.HELP_SUBMIT,  //header标题
            headerStyle: {
                borderBottomColor: 'white',
            },
        }
    };

    submit = () => {
        console.log('goto submit');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.flexView}>
                    <TextInput
                        style={styles.mainInput}
                        placeholder={In18.PLEASE_INPUT_SUGGEST}
                        multiline={true}
                        maxLength={150}
                    />
                </View>
                <View style={styles.flexView2}>
                    <TextInput
                        style={styles.input2}
                        placeholder={In18.PLEASE_INPUT_CONTRACT}
                        maxLength={20}
                    />
                </View>
                <TouchableHighlight
                    style={styles.btn}
                    underlayColor='#909090'
                    onPress={this.submit}
                >
                    <Text style={styles.btnText}>{In18.SUBMIT_SUGGEXT}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flexView: {
        marginTop: 40,
        display: 'flex',
        height: 119,
        width: Sizes.DEVICE_WIDTH - 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    input2: {
        height: 20,
        width: Sizes.DEVICE_WIDTH - 30 - 40,
    },
    btn: {
        height: 40,
        width: Sizes.DEVICE_WIDTH - 42 - 58,
        marginTop: 40,
        marginLeft: 42,
        marginRight: 58,
        borderRadius: 20,
        backgroundColor: 'rgb(102,138,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white',
        fontSize: 16
    }
});