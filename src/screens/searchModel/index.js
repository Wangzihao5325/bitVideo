import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableHighlight, FlatList } from 'react-native';

import IconBtn from '../../components/imageBtn/IconBtn';

const testData = ['火王', '期盼说', '金兰', '天线宝宝'];
class SearchHeader extends PureComponent {

    goBack = () => {
        if (this.props.navigation) {
            this.props.navigation.goBack();
        }
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.inputContainer}>
                    <Image style={styles.headerImage} source={require('../../image/usual/search.png')} />
                    <TextInput style={styles.headerTextInput} placeholder='搜索你想看的影片' placeholderTextColor='rgb(151,151,151)' />
                </View>
                <Text style={styles.backText} onPress={this.goBack}>取消</Text>
            </View>
        );
    }
}
class HistoryListItem extends PureComponent {
    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight style={styles.itemBackgroundView}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.itemTitle}>{this.props.title}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
class SearchHistory extends PureComponent {
    _clearHistory = () => {
        console.log('clear history');
    }
    render() {
        return (
            <View>
                <View style={styles.historyHeader}>
                    <Text style={styles.headerTitle}>搜索历史</Text>
                    <IconBtn style={{ marginRight: 21 }} height={22} width={22} source={require('../../image/search/clear.png')} onPress={this._clearHistory} />
                </View>
                <FlatList
                    horizontal={false}
                    numColumns={3}
                    data={testData}
                    renderItem={({ item }) => <HistoryListItem title={item} />}
                />
            </View>
        );
    }
}
export default class SearchModel extends PureComponent {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SearchHeader navigation={this.props.navigation} />
                <SearchHistory />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'rgba(248,248,248,0.82)',
        borderBottomWidth: 2
    },
    inputContainer: {
        height: 29,
        width: 261,
        borderRadius: 14,
        backgroundColor: 'rgb(247,247,247)',
        marginLeft: 29,
        marginTop: 9,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerImage: {
        height: 16,
        width: 16,
        marginLeft: 27
    },
    headerTextInput: {
        height: 29,
        width: 261 - 106,   //261-2*(27+16)-20
        marginLeft: 10
    },
    backText: {
        fontSize: 17,
        color: 'rgb(54,54,54)',
        fontWeight: 'bold',
        marginRight: 19,
        marginTop: 13
    },
    historyHeader: {
        height: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    headerTitle: {
        fontSize: 17,
        color: 'rgb(54,54,54)',
        marginLeft: 15,
        fontWeight: 'bold',
    },
    itemContainer: {
        height: 37,
        width: '33%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemBackgroundView: {
        height: 27,
        width: 100,
        borderRadius: 13,
        backgroundColor: 'rgb(247,247,247)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 14,
        color: 'rgb(100,100,100)',

    }
});