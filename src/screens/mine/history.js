import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
class Header extends PureComponent {
    moreHistory = () => {
        console.log('1111');
    }
    render() {
        return (
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={require('../../image/mine/watch_history.png')} />
                <Text style={styles.headerText}>播放记录</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableHighlight style={styles.headerBtn} onPress={this.moreHistory} underlayColor='transparent'>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnText}>更多</Text>
                            <Image style={styles.btnImage} source={require('../../image/mine/more_history.png')} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
export default class History extends PureComponent {
    render() {
        return (
            <View>
                <Header />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {

    },
    headerContainer: {
        height: 22,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35
    },
    headerImage: {
        height: 20,
        width: 20,
        marginLeft: 14
    },
    headerText: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        marginLeft: 24
    },
    headerBtn: {
        height: 20,
        width: 51,
        marginRight: 18
    },
    btnText: {
        fontSize: 14,
        color: 'rgb(120,120,120)'
    },
    btnImage: {
        height: 16,
        width: 16,
        marginLeft: 6
    }
});