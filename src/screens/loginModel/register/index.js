import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
export default class RegisterModal extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ marginTop: 100 }} onPress={this.goBack}>back</Text>
            </View>
        );
    }
}