import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from '../../global/Colors';

import VectorIconBtn from '../imageBtn/VectorIconBtn';
import IconBtn from '../imageBtn/IconBtn';

export default class ModalHeader extends PureComponent {

    static propTypes = {
        goBack: PropTypes.func,
        title: PropTypes.string.isRequired,
        rightBtnMode: PropTypes.string.isRequired,//'none','text','icon','icon_text'
        rightBtnOnPress: PropTypes.func,
        rightBtnTitle: PropTypes.string,
        iconSource: PropTypes.number,
    };

    render() {
        let backBtnColor = this.props.backBtnColor ? this.props.backBtnColor : Colors.HEADER_TITLE_COLOR;
        return (
            <View style={styles.headerContainer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {!this.props.isDisableBack &&
                        <TouchableWithoutFeedback onPress={this.props.goBack}>
                            <Image style={{ height: 21, width: 21, marginLeft: 15 }} resizeMode='contain' source={require('../../image/usual/fina_back.png')} />
                        </TouchableWithoutFeedback>
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.headerTitle, this.props.titleStyle]}>{this.props.title}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                    {this.props.rightBtnMode == 'none' && <View style={[{ height: 10, width: 10 }, styles.marginStyle]} />}
                    {this.props.rightBtnMode == 'text' && <Text onPress={this.props.rightBtnOnPress} style={[styles.RightBtnText, styles.marginStyle, this.props.textStyle]}>{this.props.rightBtnTitle}</Text>}
                    {this.props.rightBtnMode == 'icon' && <IconBtn onPress={this.props.rightBtnOnPress} style={styles.marginStyle} height={21} width={21} source={this.props.iconSource} />}
                    {/*icon_text未引入*/}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 38,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'rgba(153,153,153,0.2)',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    headerTitle: {
        fontSize: 18,
        color: Colors.HEADER_TITLE_COLOR,
    },
    RightBtnText: {
        fontSize: 18,
        color: Colors.HEADER_TITLE_COLOR,
    },
    marginStyle: {
        marginRight: 15,
    }
});