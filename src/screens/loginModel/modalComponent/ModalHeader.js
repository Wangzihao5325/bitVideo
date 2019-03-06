import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import VectorIconBtn from '../../../components/imageBtn/VectorIconBtn';

export default class ModalHeader extends PureComponent {
    render() {
        return (
            <View style={[styles.headerContainer, this.props.style]}>
                <View style={styles.headerFlexContainer}>
                    <VectorIconBtn
                        size={21}
                        name='chevron-left'
                        color='rgb(73,114,255)'
                        onPress={this.props.goBack}
                    />
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{this.props.title}</Text>
                </View>
                <View style={styles.headerFlexContainer} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 13,
        height: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    headerFlexContainer: {
        height: 25,
        width: 35,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        color: 'rgb(32,32,32)'
    },
});