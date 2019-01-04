import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableHighlight, ImageBackground } from 'react-native';
class TypeOneBtn extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.container}>
                <View></View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        height: 90,
        width: 60
    }
});