import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import * as Colors from '../../global/Colors';

import VectorIconBtn from '../imageBtn/VectorIconBtn';
import IconBtn from '../imageBtn/IconBtn';

export default class ModalHeader extends PureComponent {

    static propTypes = {
        goBack: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        rightBtnMode: PropTypes.string.isRequired,//'none','text','icon','icon_text'
        rightBtnOnPress: PropTypes.func,
        rightBtnTitle: PropTypes.string,
        iconSource: PropTypes.number,
    };

    render() {
        return (
            <View style={styles.headerContainer}>
                <VectorIconBtn
                    style={{ marginLeft: 15 }}
                    size={21}
                    name='chevron-left'
                    color={Colors.HEADER_TITLE_COLOR}
                    onPress={this.props.goBack}
                />
                <Text style={styles.headerTitle}>{this.props.title}</Text>
                {this.props.rightBtnMode == 'none' && <View style={[{ height: 10, width: 10 }, styles.marginStyle]} />}
                {this.props.rightBtnMode == 'text' && <Text onPress={this.props.rightBtnOnPress} style={[styles.RightBtnText, styles.marginStyle]}>{this.props.rightBtnTitle}</Text>}
                {this.props.rightBtnMode == 'icon' && <IconBtn onPress={this.props.rightBtnOnPress} style={styles.marginStyle} height={21} width={21} source={this.props.iconSource} />}
                {/*icon_text未引入*/}
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