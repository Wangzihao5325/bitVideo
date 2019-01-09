import React, { PureComponent } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
export default class TaskScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            // headerBackTitle: null
        }
    };

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <Text>TaskScreen</Text>
                </View>
            </SafeAreaView>
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