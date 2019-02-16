import React, { PureComponent } from 'react';
import { View, Text, Image, FlatList, TouchableHighlight, StyleSheet, ImageBackground } from 'react-native';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

class UnUseBtn extends PureComponent {
    btnPress = () => {
        if (this.props.btnPress) {
            this.props.btnPress();
        }
    }
    render() {
        if (this.props.enable) {
            return (
                <ImageBackground style={styles.enableBtnBG} source={require('../../image/task/task_tab_btn_background.png')}>
                    <TouchableHighlight style={{ margin: 4, flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={this.btnPress} underlayColor='transparent'>
                        <Text style={styles.enableBtnText}>{this.props.enableTitle}</Text>
                    </TouchableHighlight>
                </ImageBackground>
            );
        } else {
            return (
                <View style={styles.unableBtn}>
                    <Text style={styles.unableBtnText}>{this.props.unableTitle}</Text>
                </View>
            );
        }
    }
}
class Item extends PureComponent {
    render() {
        let sourceUrl = require('../../image/task/check_in_task.png');
        let ableBtnTitle = In18.GO_TO_CHECK;
        let unableTitle = In18.HAVE_CHECKED;
        switch (this.props.item.key) {
            case 'SAILY_SIGN_IN':
                sourceUrl = require('../../image/task/check_in_task.png');
                ableBtnTitle = In18.GO_TO_CHECK;
                unableTitle = In18.HAVE_CHECKED;
                break;
            case 'LOOKED_VIDEO_SATISFY':
                sourceUrl = require('../../image/task/LOOKED_VIDEO_SATISFY.png');
                ableBtnTitle = In18.GO_TO_WATCH_MOVIE;
                unableTitle = In18.HAVE_DONE;
                break;
            case 'INVITE_REGISTER':
                sourceUrl = require('../../image/task/INVITE_REGISTER.png');
                ableBtnTitle = In18.GO_TO_INVITE;
                unableTitle = In18.HAVE_DONE;
                break;
            case 'CLICK_AD':
                sourceUrl = require('../../image/task/LOOKED_VIDEO_SATISFY.png');
                ableBtnTitle = In18.GO_TO_CLICK;
                unableTitle = In18.HAVE_DONE;
                break;
            case 'DAILY_SHARED':
                sourceUrl = require('../../image/task/LOOKED_VIDEO_SATISFY.png');
                ableBtnTitle = In18.GO_TO_SHARE;
                unableTitle = In18.HAVE_DONE;
                break;
        }
        return (
            <View style={styles.itemContainer}>
                <View style={styles.tab}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={sourceUrl} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 8 }}>
                        <View style={styles.flexView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.titleText}>{this.props.item.title}</Text>
                                <View style={{ height: 20, display: 'flex', marginTop: 6, flexDirection: 'row' }}>
                                    <Image style={{ height: 15, width: 15 }} source={require('../../image/task/idol_money.png')} />
                                    <Text style={{ color: 'rgb(73,114,255)', fontSize: 14 }}>+<Text>{this.props.item.coins}</Text>{In18.IDOL_MONEY}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <UnUseBtn enable={!this.props.item.sign} enableTitle={ableBtnTitle} unableTitle={unableTitle} />
                            </View>
                        </View>
                        <Text style={{ marginBottom: 14, fontSize: 10, color: 'rgb(151,151,151)' }}>{this.props.item.remark}</Text>
                    </View>

                </View>
            </View>
        );
    }
}

class ListHeader extends PureComponent {
    render() {
        return (
            <View style={styles.listHeader}>
                <View style={styles.listHeaderFlexView} />
                <Text style={styles.listHeaderText}>{In18.DAILY_TASK}</Text>
            </View>
        );
    }
}

export default class bottomTaskList extends PureComponent {
    state = {
        listData: []
    };
    componentDidMount() {
        Api.getTaskList((e) => {
            if (e instanceof Array) {
                console.log('task');
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
                <ListHeader />
                {this.state.listData.length > 0 &&
                    <FlatList
                        data={this.state.listData}
                        renderItem={({ item }) => <Item item={item} />}
                    />
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
        height: 120 - 20,
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
    },
    unableBtn: {
        height: 30,
        width: 80,
        backgroundColor: 'rgb(242,244,245)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    unableBtnText: {
        fontSize: 12,
        color: 'rgb(151,151,151)'
    },
    enableBtnBG: {
        height: 38,
        width: 88,
        marginRight: 13
    },
    enableBtnText: {
        fontSize: 12,
        color: 'white'
    },
    listHeader: {
        height: 25,
        width: '100%',
        display: 'flex',
        marginTop: 23,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    listHeaderFlexView: {
        height: 20,
        width: 4,
        borderRadius: 2,
        backgroundColor: 'rgb(73,114,255)',
        marginLeft: 15
    },
    listHeaderText: {
        marginLeft: 10,
        fontSize: 18,
        color: 'rgb(54,54,54)'
    }
});