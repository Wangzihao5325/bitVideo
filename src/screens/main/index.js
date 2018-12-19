import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default class MainScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>MainScreen</Text>
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