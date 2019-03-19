import React, { PureComponent } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableHighlight } from 'react-native';

import SecurtyImage from '../../components/securtyImage/index';

class Item extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.itemContainer}>
                <View style={styles.itemFlexView}>
                    <SecurtyImage style={styles.image} source={{ uri: this.props.uri }} />
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class GlobalTypeModule extends PureComponent {
    render() {
        let defaultHeight = { height: 205 };
        if (Array.isArray(this.props.data) && this.props.data.length > 0) {
            let lines = Math.ceil(this.props.data.length / 4);
            let heightNum = lines * 90;
            defaultHeight = { height: heightNum };
        }
        return (
            <View style={[styles.container, defaultHeight]}>
                {Array.isArray(this.props.data) && this.props.data.length > 0 &&
                    <FlatList
                        style={{ flex: 1 }}
                        numColumns={4}
                        data={this.props.data}
                        renderItem={({ item }) => <Item title={item.title} uri={item.icon} type={item.global_type} />}
                    />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        height: 90,
        width: '25%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemFlexView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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