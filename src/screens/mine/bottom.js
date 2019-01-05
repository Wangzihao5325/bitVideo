import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';
class Item extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.itemContainer} onPress={this.props.onPress} underlayColor='transparent'>
                <View style={styles.flexView}>
                    <Image style={styles.itemImage} source={this.props.source} />
                    <Text style={styles.itemTitle} >{this.props.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <Image style={styles.arrowImage} source={require('../../image/mine/right_arrow.png')} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
export default class Bottom extends PureComponent {
    myCache = () => {
        console.log('my cache');
    }
    myStar = () => {
        console.log('my myStar');
    }
    getHelp = () => {
        console.log('my getHelp');
    }
    render() {
        return (
            <View style={{ paddingBottom: 20 }} >
                <Item source={require('../../image/mine/myCache.png')} title='我的缓存' onPress={this.myCache} />
                <Item source={require('../../image/mine/myCache.png')} title='我的收藏' onPress={this.myStar} />
                <Item source={require('../../image/mine/myCache.png')} title='帮助反馈' onPress={this.getHelp} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 26,
        width: '100%',
        marginTop: 20
    },
    flexView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        height: 22,
        width: 22,
        marginLeft: 13,
    },
    itemTitle: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        marginLeft: 23
    },
    arrowImage: {
        height: 19,
        width: 10,
        marginRight: 15
    }
});