import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
export default class InputBottom extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        backgroundColor: 'red'
    }
});