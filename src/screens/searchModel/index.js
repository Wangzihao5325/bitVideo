import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableHighlight, FlatList, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import Api from '../../socket/index';
import { connect } from 'react-redux';
import store from '../../store/index';
import { store_dispath_search_history_add, store_dispath_search_history_get, search_history_clear } from '../../store/actions/searchHistoryAction';

import IconBtn from '../../components/imageBtn/IconBtn';

const reg = { searchInput: '' };
class SearchHeader extends PureComponent {

    static contextTypes = {
        searchNavigation: PropTypes.object
    }

    goBack = () => {
        const { searchNavigation } = this.context;
        searchNavigation.goBack();
    }

    _textChange = (e) => {
        reg.searchInput = e;
    }

    _endEdit = () => {
        if (reg.searchInput && reg.searchInput.length > 0) {
            store_dispath_search_history_add(reg.searchInput);
            Api.getSearchVideoByName(reg.searchInput, (e) => {
                if (e) {
                    console.log('this is search!');
                    console.log(e);
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.inputContainer}>
                    <Image style={styles.headerImage} source={require('../../image/usual/search.png')} />
                    <TextInput onChangeText={this._textChange} onEndEditing={this._endEdit} clearButtonMode='while-editing' returnKeyType='search' style={styles.headerTextInput} placeholder='搜索你想看的影片' placeholderTextColor='rgb(151,151,151)' />
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
        store.dispatch(search_history_clear());
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
                    data={this.props.data}
                    renderItem={({ item }) => <HistoryListItem title={item} />}
                />
            </View>
        );
    }
}

class RecommendIndex extends PureComponent {
    render() {
        let indexStyle = null;
        let indexTextStyle = null;
        switch (this.props.index) {
            case 0:
                indexStyle = { backgroundColor: 'rgb(255,0,48)' };
                indexTextStyle = { color: 'white' };
                break;
            case 1:
                indexStyle = { backgroundColor: 'rgb(255,205,10)' };
                indexTextStyle = { color: 'white' };
                break;
            case 2:
                indexStyle = { backgroundColor: 'rgb(73,114,255)' };
                indexTextStyle = { color: 'white' };
                break;
            default:
                indexStyle = { backgroundColor: 'white', borderColor: 'rgb(73,114,255)', borderWidth: 1 };
                indexTextStyle = { color: 'rgb(73,114,255)' };
                break;
        }
        return (
            <View style={[styles.indexContainer, indexStyle, this.props.style]}>
                <Text style={[styles.indexText, indexTextStyle]}>{this.props.index + 1}</Text>
            </View>
        );
    }
}

class RecommendItem extends PureComponent {

    static contextTypes = {
        searchNavigation: PropTypes.object
    }

    _goToMovieDetail = () => {
        const { searchNavigation } = this.context;
        searchNavigation.navigate('VideoModel', { videoId: this.props.id });
    }

    render() {
        return (
            <View style={styles.recommendItemContainer}>
                <RecommendIndex style={{ marginLeft: 15 }} index={this.props.index} />
                <Text onPress={this._goToMovieDetail} numberOfLines={1} ellipsizeMode='tail' style={styles.itemText}>{this.props.title}</Text>
            </View>
        );
    }
}

class SearchRecommend extends PureComponent {

    state = {
        data: []
    };

    componentDidMount() {
        Api.getSearchRecommendVideo((e) => {
            if (e) {
                let dataArr = e.data;
                if (dataArr.length > 10) {
                    dataArr = dataArr.slice(0, 10);
                }
                this.setState({
                    data: dataArr
                });
            }
        });
    }

    render() {
        return (
            <View>
                <View style={styles.recommendHeader}>
                    <Text style={styles.headerTitle}>热门搜索</Text>
                </View>
                {this.state.data.length > 0 &&
                    <FlatList
                        numColumns={2}
                        data={this.state.data}
                        renderItem={({ item, index }) => <RecommendItem index={index} title={item.title} id={item.id} />}
                    />
                }
            </View>
        );
    }
}

class SearchModel extends PureComponent {

    static childContextTypes = {
        searchNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            searchNavigation: this.props.navigation
        }
    }

    componentDidMount() {
        store_dispath_search_history_get();
    }

    componentWillUnmount() {
        reg.searchInput = '';
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <SearchHeader />
                {this.props.isShow && <SearchHistory data={this.props.data} />}
                <SearchRecommend />
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        isShow: store.searchHistory.isShow,
        data: store.searchHistory.data,
    }
}

export default connect(mapState2Props)(SearchModel);

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

    },
    itemText: {
        fontSize: 12,
        color: 'rgb(100,100,100)',
        marginLeft: 9
    },
    recommendHeader: {
        height: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    indexContainer: {
        height: 18,
        width: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9
    },
    indexText: {
        fontSize: 14
    },
    recommendItemContainer: {
        height: 17 + 18,
        width: '50%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    }
});