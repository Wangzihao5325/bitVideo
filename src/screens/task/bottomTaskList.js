import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableHighlight, StyleSheet } from 'react-native';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';

export default class Item extends PureComponent {
    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.tab}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={require('../../image/task/check_in_task.png')} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <View style={styles.flexView}>
                            <View>
                                <Text style={styles.titleText}>签到任务</Text>
                                <View style={{ height: 20, display: 'flex', marginTop: 4, flexDirection: 'row' }}>
                                    <Image style={{ height: 15, width: 15 }} source={require('../../image/task/idol_money.png')} />
                                    <Text style={{ color: 'rgb(73,114,255)', fontSize: 14 }}>+10爱逗币</Text>
                                </View>
                            </View>
                            <View>
                                {/* <TouchableHighlight></TouchableHighlight> */}
                            </View>
                        </View>
                        <Text style={{ marginBottom: 14, fontSize: 10, color: 'rgb(151,151,151)' }}>每日点击签到即可获得爱逗币</Text>
                    </View>

                </View>
            </View>
        );
    }
}

class bottomTaskList extends PureComponent {
    state = {
        listData: []
    };
    componentDidMount() {
        Api.getTaskList((e) => {
            if (e instanceof Array) {
                console.log(e);
                let arr = e.reverse();
                this.setState({
                    listData: arr
                });
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.listData.length > 0 &&
                    <FlatList />
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 110,
        width: '100%',
        display: 'flex'
    },
    tab: {
        height: 110 - 20,
        width: Sizes.DEVICE_WIDTH - 30,
        marginHorizontal: 15,
        marginVertical: 10,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    iconContainer: {
        width: 38 + 11,
        height: 100
    },
    icon: {
        height: 38,
        width: 38,
        marginLeft: 11,
        marginTop: 14
    },
    flexView: {
        marginTop: 21,
        height: 42,
        flex: 1,
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 16,
        color: 'rgb(54,54,54)'
    }
});