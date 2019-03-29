import React, { PureComponent } from 'react';
import { StyleSheet, View, ImageBackground, TouchableHighlight, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

class Toptab extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.tabImageBg} onPress={this.props.toIcons} underlayColor='transparent'>
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={styles.tabImageBg} source={require('../../image/task/tab_bg1.png')}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'rgb(156,160,173)', marginLeft: 19, marginTop: 12, fontWeight: 'bold' }}>当前金币</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: 33, width: 33, marginLeft: 18 }} source={require('../../image/task/icons.png')} />
                                    <Text style={{ fontSize: 21, color: 'rgb(34,34,34)', marginLeft: 6 }}>{this.props.coin}</Text>
                                </View>
                                <Icon style={{ marginRight: 18 }} name='chevron-right' size={22} color='rgb(33,45,49)' />
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.tabImageBg} onPress={this.props.toGift} underlayColor='transparent'>
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={styles.tabImageBg} source={require('../../image/task/tab_bg2.png')}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 12, color: 'rgb(156,160,173)', marginLeft: 19, marginTop: 12, fontWeight: 'bold' }}>当前兑换</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image style={{ height: 33, width: 33, marginLeft: 18 }} source={require('../../image/task/gift.png')} />
                                    <Text style={{ fontSize: 16, color: 'rgb(252,252,252)', marginLeft: 6 }}>兑换中心</Text>
                                </View>
                                <Icon style={{ marginRight: 18 }} name='chevron-right' size={22} color='rgb(255,255,255)' />
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        coin: store.account.icons,
    }
}

export default connect(mapState2Props)(Toptab);

const styles = StyleSheet.create({
    container: {
        height: 110,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40
    },
    tabImageBg: {
        height: 109,
        width: 189,
        display: 'flex',
    }
});