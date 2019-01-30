import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, Keyboard, Text } from 'react-native';

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
                <TextInput style={styles.input} placeholder='我来说两句..' />
                {this.state.isKeyboardShow && <Text>111111</Text>}
                {!this.state.isKeyboardShow && <Text>222222</Text>}
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
        width: 250,
        borderColor: 'rgb(242,242,242)',
        borderWidth: 1,
        marginLeft: 10
    }
});