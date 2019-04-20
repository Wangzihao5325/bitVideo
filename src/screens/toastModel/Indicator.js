import React, { PureComponent } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default class IndicatorScreen extends PureComponent {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }
}