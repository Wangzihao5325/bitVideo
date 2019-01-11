import React, { PureComponent } from 'react';
import { View, ImageBackground, TouchableHighlight, Image, Text, StyleSheet } from 'react-native';
import * as In18 from '../../global/In18';

class Btn extends PureComponent {
    render() {
        return (
            <ImageBackground style={styles.background} source={require('../../image/task/btn_background1.png')}>
                <TouchableHighlight style={styles.btn} onPress={this.props.onPress} underlayColor='transparent'>
                    <View style={styles.btn}>
                        <Image style={styles.image} source={this.props.source} />
                        <Text style={styles.text}>{this.props.title}</Text>
                    </View>
                </TouchableHighlight>
            </ImageBackground>
        );
    }
}
export default class Middle extends PureComponent {
    myInvite = () => {
        console.log('invite');
    }
    giftCenter = () => {
        console.log('center');
    }
    render() {
        return (
            <View style={styles.middleContainer}>
                <Btn source={require('../../image/task/my_invite.png')} title={In18.MY_INVITE} onPress={this.myInvite} />
                <Btn source={require('../../image/task/gift.png')} title={In18.GIFT_CENTER} onPress={this.giftCenter} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    background: {
        height: 32,
        width: 90,
        borderRadius: 16,
        display: 'flex',
        marginLeft: 48,
        marginRight: 48
    },
    btn: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 18,
        width: 18,
        marginLeft: 10
    },
    text: {
        marginLeft: 3,
        fontSize: 12,
        color: 'white'
    },
    middleContainer: {
        height: 32,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 52
    }
});