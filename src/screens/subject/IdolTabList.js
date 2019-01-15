import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';
import Api from '../../socket/index';

export default class Item extends PureComponent {
    componentDidMount() {
        Api.getActerList((e) => {
            console.log(e);
        });
    }

    seeActorDetails = () => {
        console.log('actor details');
    }

    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemTab}>
                    <View style={styles.itemContent}>
                        <View style={{ height: 63, width: 234, marginTop: 16, display: 'flex', flexDirection: 'row' }}>
                            <Image style={styles.itemImage} source={{ uri: "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=6b50bd25cfcec3fd8b3ea073eeb3b302/6159252dd42a2834e6d976e257b5c9ea14cebfd8.jpg" }} />
                            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                <Text style={styles.actorName}>刘德华</Text>
                                <Text style={styles.actorFocus}>关注：1566.2万</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ marginLeft: 10, color: 'rgb(100,100,100)', fontSize: 10 }}>刘德华（AndyLau），1961年9月27日出生于中国香港，中国香港男演员、歌手、作词人、制片人。</Text>
                        </View>
                    </View>
                    <View style={styles.itemFlexView}>
                        <TouchableHighlight onPress={this.seeActorDetails} style={styles.tabBtn} underlayColor='transparent'><Text style={styles.tabBtnText}>立即查看</Text></TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

class IdolTabList extends PureComponent {
    componentDidMount() {
        Api.getActerList((e) => {
            console.log(e);
        });
    }
    render() {
        return (
            <View></View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 234 + 10,
        height: 161,
        display: 'flex',
        alignItems: 'center'
    },
    itemTab: {
        width: 234,
        height: 161,
        marginLeft: 5,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    itemContent: {
        height: 115,
        width: 234 - 20,
        display: 'flex',
        borderBottomWidth: 2,
        borderBottomColor: 'rgb(238,238,238)'
    },
    itemFlexView: {
        height: 46,
        width: 234 - 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    itemImage: {
        height: 63,
        width: 63,
        marginLeft: 16,
        borderRadius: 31
    },
    actorName: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        marginLeft: 19
    },
    actorFocus: {
        fontSize: 14,
        color: 'rgb(151,151,151)',
        marginLeft: 19
    },
    tabBtn: {
        marginRight: 31,
        height: 27,
        width: 87,
        borderRadius: 13,
        backgroundColor: 'rgb(73,114,255)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBtnText: {
        color: 'white',
        fontSize: 12,
    }
});