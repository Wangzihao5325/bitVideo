import React, { PureComponent } from 'react';
import { TouchableHighlight, Image, StyleSheet } from 'react-native';
export default class IconBtn extends PureComponent {
    constructor(props) {
        super(props);
        this.height = props.height ? props.height : 26;
        this.width = props.width ? props.width : 26;
    }
    btnOnPress = () => {
        if (typeof this.props.onPress === 'function') {
            this.props.onPress();
        }
    }
    render() {
        return (
            <TouchableHighlight
                style={{ height: this.height, width: this.width, display: 'flex' }}
                onPress={this.btnOnPress}
                underlayColor='transparent'
            >
                <Image
                    style={styles.container}
                    source={this.props.source}
                />
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});