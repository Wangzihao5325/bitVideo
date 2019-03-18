import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native';

import SecurtyImage from '../../components/securtyImage/index';

import typeDatas from '../../mock/globalType';

class Item extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.itemContainer}>
                <View style={styles.itemFlexView}>
                    <SecurtyImage style={styles.image} uri={this.props.uri} />
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class GlobalTypeModule extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={typeDatas}
                    renderItem={({ item }) => <Item title={item.title} uri={item.icon} />}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 90,
        width: 88,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemFlexView: {
        flex: 1
    },
    image: {
        height: 62,
        width: 62,
    },
    titleText: {
        fontSize: 14,
        color: 'rgb(187,186,186)',
        marginTop: 5
    },
    container: {
        height: 205,
        width: '100%'
    }
});