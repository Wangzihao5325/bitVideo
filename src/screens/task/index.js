import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default class TaskScreen extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text>TaskScreen</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});