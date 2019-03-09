import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import * as In18 from '../../global/In18';
import Api from '../../socket/index';
import * as Sizes from '../../global/Sizes';

class Item extends PureComponent {
    _itemPress = () => {
        console.log('11223345');
    }

    render() {
        return (
            <TouchableOpacity style={styles.itemContainer} activeOpacity={0.7} onPress={this._itemPress}>
                <ImageBackground defaultSource={require('../../image/usual/banner_load_failed.png')} style={styles.itemContainer} imageStyle={styles.itemBgImage} source={{ uri: this.props.url }}>
                    <View style={styles.itemFlexView}>
                        <Text style={styles.itemText}>{this.props.title}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}

export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.SUBJECT_PAGE_TITLE,  //header标题
        }
    };

    state = {
        listData: [],
        nowPage: -1,
        totalPage: -1,
        refreshing: false
    }

    componentDidMount() {
        this.setState({
            refreshing: true
        });
        Api.getNewSubjectList(1, 10, (e, message, code) => {
            if (e.data.length > 0) {
                this.setState({
                    listData: e.data,
                    nowPage: e.current_page,
                    totalPage: e.total,
                    refreshing: false
                });
            } else {
                this.setState({
                    refreshing: false
                });
            }
        });
    }

    _refresh = () => {
        this.setState({
            refreshing: true
        });
        Api.getNewSubjectList(1, 10, (e, message, code) => {
            if (e.data.length > 0) {
                this.setState({
                    listData: e.data,
                    nowPage: e.current_page,
                    totalPage: e.total,
                    refreshing: false
                });
            } else {
                this.setState({
                    refreshing: false
                });
            }
        });
    }

    _endReached = () => {
        if (this.state.nowPage < this.state.totalPage) {
            Api.getNewSubjectList(this.state.nowPage + 1, 10, (e, message, code) => {
                if (e.data.length > 0) {
                    this.setState((prestate, props) => {
                        let newlistData = prestate.listData.concat(e.data);
                        return {
                            listData: newlistData,
                            nowPage: e.current_page,
                            totalPage: e.total,
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    onRefresh={this._refresh}
                    refreshing={this.state.refreshing}
                    onEndReached={this._endReached}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignSelf: 'center' }}
                    data={this.state.listData}
                    renderItem={({ item }) => <Item title={item.title} id={item.id} url={item.cover_img} />}
                    ItemSeparatorComponent={() => <View style={{ height: 10, width: Sizes.DEVICE_WIDTH - 20 }} />}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 200,
        width: Sizes.DEVICE_WIDTH - 20,
    },
    itemFlexView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    itemBgImage: {
        borderRadius: 10
    },
    itemText: {
        marginBottom: 10,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    container: {
        width: '100%',
        height: 1500,
        display: 'flex',
        backgroundColor: 'white',
    },
    titleText: {
        marginTop: 18,
        marginBottom: 14,
        marginLeft: 15,
        color: 'rgb(54,54,54)',
        fontSize: 18,
        fontWeight: 'bold'
    }
});