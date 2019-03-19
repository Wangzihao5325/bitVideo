import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import * as Colors from '../../../global/Colors';
import { View } from 'react-native-animatable';

export default class DetailTypeScreen extends PureComponent {
    // static navigationOptions = ({ navigation }) => {
    //     return {
    //         header: null,
    //         headerBackTitle: null
    //     }
    // };

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        console.log('1212121212');
        console.log(type);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                </View>
            </SafeAreaView>
        );
    }
}