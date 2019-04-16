import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, TextInput, TouchableHighlight, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Api from '../../socket/index';
import { connect } from 'react-redux';
import store from '../../store/index';
import { store_dispath_search_history_add, store_dispath_search_history_get, search_history_clear, get_search_result_data, reset_search_result_data } from '../../store/actions/searchHistoryAction';
import * as In18 from '../../global/In18';
import * as Colors from '../../global/Colors';
import { naviToVideoService } from '../../screens/videoModel/VideoService';


import IconBtn from '../../components/imageBtn/IconBtn';
import VideoDetailInfo from '../../components/imageBtn/VideoDetailInfo';

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
        if (!e || e == '') {
            store.dispatch(reset_search_result_data());
        }
    }

    _endEdit = () => {
        if (reg.searchInput && reg.searchInput.length > 0) {
            store_dispath_search_history_add(reg.searchInput);
            Api.getSearchVideoByName(reg.searchInput, (e) => {
                if (e.data) {
                    store.dispatch(get_search_result_data(e.data));
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.inputContainer}>
                    <Image style={styles.headerImage} source={require('../../image/usual/search.png')} />
                    <TextInput onChangeText={this._textChange} onEndEditing={this._endEdit} clearButtonMode='always' returnKeyType='search' style={styles.headerTextInput} placeholder={In18.SEARCH_TITLE} placeholderTextColor='rgb(178,178,178)' />
                </View>
                <Text style={styles.backText} onPress={this.goBack}>{In18.CANCEL_TEXT}</Text>
            </View>
        );
    }
}

class HistoryListItem extends PureComponent {
    _searchByHistory = () => {
        Api.getSearchVideoByName(this.props.title, (e) => {
            if (e.data) {
                store.dispatch(get_search_result_data(e.data));
            }
        });
    }
    render() {
        return (
            <View style={styles.itemContainer}>
                <TouchableHighlight style={styles.itemBackgroundView} onPress={this._searchByHistory} underlayColor='transparent'>
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
                    <Text style={styles.headerTitle}>{In18.SEARCH_HISTORY}</Text>
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
                indexStyle = { backgroundColor: Colors.SCREEN_BGCOLOR, borderColor: 'rgb(255,178,117)', borderWidth: 1 };
                indexTextStyle = { color: 'rgb(255,178,117)' };
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
        // const { searchNavigation } = this.context;
        // searchNavigation.navigate('VideoModel', { videoId: this.props.id });
        naviToVideoService(this.props.id);

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
                    <Text style={styles.headerTitle}>{In18.HOT_SEARCH}</Text>
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

class ResultList extends PureComponent {
    static contextTypes = {
        searchNavigation: PropTypes.object
    }
    render() {
        const { searchNavigation } = this.context;
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.data}
                renderItem={({ item }) => <VideoDetailInfo title={item.title} intro={item.intro} director={item.director} source={{ uri: item.cover_path }} navi={searchNavigation} id={item.id} />}
            />
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
        //数据清除，只清除搜索结果，不清除历史数据
        reg.searchInput = '';
        store.dispatch(reset_search_result_data());
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <SearchHeader />
                    {!this.props.isResult && this.props.isShow && <SearchHistory data={this.props.data} />}
                    {!this.props.isResult && <SearchRecommend />}
                    {this.props.isResult && this.props.searchresult.length > 0 && < ResultList data={this.props.searchresult} />}
                    {this.props.isResult && this.props.searchresult.length == 0 && <Text style={{ alignSelf: 'center', marginTop: 40 }}>{In18.NO_SEARCH_RESULT}</Text>}
                </SafeAreaView>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        isShow: store.searchHistory.isShow,
        data: store.searchHistory.data,
        isResult: store.searchHistory.isResult,
        searchresult: store.searchHistory.resultData
    }
}

export default connect(mapState2Props)(SearchModel);

const styles = StyleSheet.create({
    headerContainer: {
        height: 44,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputContainer: {
        height: 38,
        width: 261,
        borderRadius: 14,
        backgroundColor: 'rgb(51,57,62)',
        marginLeft: 29,
        marginTop: 3,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerImage: {
        height: 20,
        width: 20,
        marginLeft: 27
    },
    headerTextInput: {
        height: 38,
        width: 261 - 53,   //261-2*(27+16)-20
        marginLeft: 10,
        fontSize: 14,
        color: 'rgb(178,178,178)'
    },
    backText: {
        fontSize: 17,
        color: 'rgb(178,178,178)',
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
        color: 'rgb(178,178,178)',
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
        backgroundColor: 'rgb(51,57,62)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 14,
        color: Colors.NAVI_ACTIVE_TINT_COLOR,

    },
    itemText: {
        fontSize: 16,
        color: 'rgb(100,100,100)',
        marginLeft: 9,
        height: 20,
        width: 100
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
    },
    resultItemContainer: {
        height: 134,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    borderBottom: {
        borderBottomColor: 'rgba(153,153,153,0.2)',
        borderBottomWidth: 1
    },
    resultItemImage: {
        width: 88,
        height: 114,
        marginLeft: 14
    },
    resultItemTitle: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        marginLeft: 20,
        fontWeight: 'bold',
        marginTop: 1
    },
    resultItemIntro: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
        marginTop: 8,
        marginRight: 20,
        height: 50,
        marginLeft: 10
    }
});