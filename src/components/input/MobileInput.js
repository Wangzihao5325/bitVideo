import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';

import IconBtn from '../../components/imageBtn/IconBtn';

const DEFALUT_WIDTH = Sizes.DEVICE_WIDTH - 34 - 31;
class MobileInput extends PureComponent {
    clear = () => {
        if (this.input) {
            this.input.clear();
        }
    }
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.contentView}>
                    <Image source={require('../../image/mine/mobile_input.png')} />
                    <Text onPress={this.props.changeCode} style={styles.text}>{this.props.countryCode}</Text>
                    <TextInput
                        ref={(ref) => this.input = ref}
                        style={styles.textInput}
                        placeholder={In18.PLEASE_INPUT_PHONE_NUMBER}
                        placeholderTextColor='rgb(151,151,151)'
                        keyboardType='number-pad'
                    />
                    <IconBtn
                        onPress={this.clear}
                        height={16}
                        width={16}
                        source={require('../../image/mine/clear_input.png')}
                    />
                </View>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        countryCode: store.countryCode.countryCode
    }
}

export default connect(mapState2Props)(MobileInput);

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
    text: {
        fontSize: 16,
        color: 'rgb(73,114,255)',
        marginLeft: 19
    },
    textInput: {
        marginLeft: 6,
        flex: 1,
        fontSize: 16,
        color: 'rgb(54,54,54)'
    }
});