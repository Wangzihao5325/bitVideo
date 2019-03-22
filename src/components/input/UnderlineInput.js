import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

const DEFALUT_WIDTH = Sizes.DEVICE_WIDTH - 34 - 31;
export default class UnderlineInput extends PureComponent {
    textOnChange = (text) => {
        if (this.props.onTextChange) {
            this.props.onTextChange(text);
        }
    }
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.contentView}>
                    <Image source={require('../../image/mine/ver_code.png')} />
                    <TextInput
                        ref={(ref) => this.input = ref}
                        onChangeText={this.textOnChange}
                        style={styles.textInput}
                        placeholder={In18.PLEASE_INPUT_INVITE_CODE}
                        placeholderTextColor='white'
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 44,
        width: DEFALUT_WIDTH,
        display: 'flex',
        borderBottomColor: '#909090',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginLeft: 34
    },
    contentView: {
        height: 22,
        width: DEFALUT_WIDTH,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 30
    },
    textInput: {
        marginLeft: 19,
        flex: 1,
        fontSize: 16,
        color: 'white'
    }
});