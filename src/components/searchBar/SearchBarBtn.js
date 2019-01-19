import React, { PureComponent } from 'react';
import { TouchableHighlight, View, Image, Text, StyleSheet } from 'react-native';
export default class SearchBarBtn extends PureComponent {
    goToSearch = () => {

    }
    render() {
        return (
            <TouchableHighlight style={[styles.btn, this.props.style]} onPress={this.goToSearch} underlayColor='transparent'>
                <View style={styles.flexView}>
                    <Image style={styles.image} source={require('../../image/usual/search.png')} />
                    <Text style={styles.text}>我和你的倾城时光</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
const styles = StyleSheet.create({
    btn: {
        height: 34,
        width: 255,
        backgroundColor: 'rgb(239,244,247)',
        borderRadius: 17,
        display: 'flex'
    },
    flexView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        height: 20,
        width: 20,
        marginLeft: 16
    },
    text: {
        marginLeft: 15,
        fontSize: 14,
        color: 'rgb(187,186,186)'
    }
});