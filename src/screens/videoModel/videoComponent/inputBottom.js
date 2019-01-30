import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
export default class InputBottom extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} />
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
        alignItems: 'center'
    },
    input: {
        height: 30,
        width: 100,
        backgroundColor: 'rgb(242,242,242)'
    }
});