import React, { PureComponent } from 'react';
import { StyleSheet, View, ImageBackground, TouchableHighlight } from 'react-native';
export default class Toptab extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.tabImageBg}>
                    <TouchableHighlight style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'rgb(156,160,173)' }}>当前金币</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                            
                            </View>
                        </View>
                    </TouchableHighlight>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    tabImageBg: {
        height: 109,
        width: 189,
        display: 'flex'
    }
});