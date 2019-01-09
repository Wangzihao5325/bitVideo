import React, { PureComponent } from 'react';
import { SafeAreaView, ImageBackground, ScrollView, View, Text, StyleSheet } from 'react-native';
export default class TaskScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            // headerBackTitle: null
        }
    };

    render() {
        return (
            <ScrollView
                style={{ height: 1136, width: '100%' }}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../image/task/task_background.png')}
                >
                    <SafeAreaView>
                        <View style={styles.container}>
                            <Text>TaskScreen</Text>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    imageBackground: {
        width: '100%',
        height: 1136,//780
    }
});