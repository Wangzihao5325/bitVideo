import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default class SubjectScreen extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text>SubjectScreen</Text>
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