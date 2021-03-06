import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight, FlatList } from 'react-native';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';

class Item extends PureComponent {

    seeActorDetails = () => {
        console.log('actor details');
    }

    render() {
        let actorName = this.props.item.name ? this.props.item.name : '';
        let focus = this.props.item.video_count ? this.props.item.video_count : '';
        let intro = this.props.item.intro ? this.props.item.intro : '';
        let url = this.props.item.cover_path ? this.props.item.cover_path : '';
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemTab}>
                    <View style={styles.itemContent}>
                        <View style={{ height: 63, width: 234, marginTop: 16, display: 'flex', flexDirection: 'row' }}>
                            <Image style={styles.itemImage} source={{ uri: url }} />
                            <View style={{ flex: 1, justifyContent: 'space-around' }}>
                                <Text style={styles.actorName}>{actorName}</Text>
                                <Text style={styles.actorFocus}><Text>{In18.ACTOR_WORKS}</Text>{focus}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ marginLeft: 10, color: 'rgb(144,144,144)', fontSize: 14 }}>{intro}</Text>
                        </View>
                    </View>
                    <View style={styles.itemFlexView}>
                        <TouchableHighlight onPress={this.seeActorDetails} style={styles.tabBtn} underlayColor='transparent'><Text style={styles.tabBtnText}>{In18.SEE_RIGHT_NOW}</Text></TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}

export default class IdolTabList extends PureComponent {
    state = {
        data: []
    };
    componentDidMount() {
        Api.getActerList((e) => {
            if (e.data) {
                this.setState({ data: e.data });
            }
        });
    }
    render() {
        return (
            <View style={styles.flatList}>
                <FlatList
                    style={{ marginTop: 2 }}
                    data={this.state.data}
                    renderItem={({ item }) => <Item item={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 234 + 10,
        height: 163,
        display: 'flex',
        alignItems: 'center'
    },
    itemTab: {
        marginTop: 2,
        width: 234,
        height: 161,
        marginLeft: 5,
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'rgb(255,178,117)',
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
        borderBottomColor: 'rgb(251,149,68)'
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
        color: 'rgb(32,32,32)',
        marginLeft: 19
    },
    actorFocus: {
        fontSize: 14,
        color: 'rgb(96,96,96)',
        marginLeft: 19
    },
    tabBtn: {
        marginRight: 31,
        height: 27,
        width: 87,
        borderRadius: 13,
        backgroundColor: 'rgb(238,128,42)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBtnText: {
        color: 'rgb(32,32,32)',
        fontSize: 12,
    },
    flatList: {
        width: '100%',
        height: 170,
    }
});