import React, { PureComponent } from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ICON_SIZE = 21;
const TAB_NAVI_DEFAULT_TINT_COLOR = '#909090';
export default class VectorIconBtn extends PureComponent {
    render() {
        let size = this.props.size ? this.props.size : ICON_SIZE
        return (
            <TouchableHighlight onPress={this.props.onPress} style={[styles.container, { ...this.props.style }]} underlayColor={null}>
                <Icon name={this.props.name} size={size} color={this.props.color ? this.props.color : TAB_NAVI_DEFAULT_TINT_COLOR} />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: ICON_SIZE,
        width: ICON_SIZE,
        justifyContent: 'center',
        alignItems: 'center'
    }
});