import React, { PureComponent } from 'react';
import { View, StyleSheet, Image, Text, TouchableHighlight, FlatList } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import PropTypes from 'prop-types';
import * as In18 from '../../global/In18';
import Api from '../../socket/index';
import store from '../../store/index';
import { get_history_movie_list } from '../../store/actions/watchHistoryAction';
import { connect } from 'react-redux';

import watchHistory from '../../mock/watchHistory';

class Header extends PureComponent {
    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    moreHistory = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('HistoryModel');
    }
    render() {
        return (
            <View style={styles.headerContainer}>
                <Image style={styles.headerImage} source={require('../../image/mine/watch_history.png')} />
                <Text style={styles.headerText}>{In18.WATCH_HISTORY}</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableHighlight style={styles.headerBtn} onPress={this.moreHistory} underlayColor='transparent'>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.btnText}>{In18.MORE_TEXT}</Text>
                            <Image style={styles.btnImage} source={require('../../image/mine/more_history.png')} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
class Item extends PureComponent {
    static contextTypes = {
        mineNavigation: PropTypes.object
    }

    watchHistoryPressing = () => {
        const { mineNavigation } = this.context;
        mineNavigation.navigate('VideoModel', { videoId: this.props.id });
    }
    render() {
        return (
            <TouchableHighlight style={styles.itemContainer} onPress={this.watchHistoryPressing} underlayColor='transparent'>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={styles.itemImage} source={this.props.source} />
                    <View style={styles.itemTextContainer}>
                        <Text style={styles.itemTitle}>{this.props.title}</Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
class Snap extends PureComponent {
    render() {
        if (this.props.data && this.props.data.length > 0) {
            console.log('history!!')
            console.log(this.props.data);
            return (
                <FlatList
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.props.data}
                    renderItem={({ item }) => <Item source={{ uri: item.cover_path }} title={item.title} id={item.id} />}
                />
            );
        } else {
            return (
                <View style={[styles.flatList, { justifyContent: 'center', alignItems: 'center' }]} >
                    <Text style={{ color: 'rgb(151,151,151)', fontSize: 16 }}>{In18.NO_WATCH_HISTORY}</Text>
                </View>
            );
        }
    }
}
class History extends PureComponent {

    _onDidFocus = () => {
        Api.getUserWatchHistory((e) => {
            if (e) {
                store.dispatch(get_history_movie_list(e.data));
            }
        });
    }

    render() {
        return (
            <View >
                <NavigationEvents
                    onDidFocus={this._onDidFocus}
                />
                <Header />
                <Snap data={this.props.data} />
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.watchHistory.historyMovies,
    }
}

export default connect(mapState2Props)(History);

const styles = StyleSheet.create({
    headerContainer: {
        height: 22,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35
    },
    headerImage: {
        height: 20,
        width: 20,
        marginLeft: 14
    },
    headerText: {
        fontSize: 16,
        color: 'rgb(54,54,54)',
        marginLeft: 24
    },
    headerBtn: {
        height: 20,
        width: 51,
        marginRight: 18
    },
    btnText: {
        fontSize: 14,
        color: 'rgb(120,120,120)'
    },
    btnImage: {
        height: 16,
        width: 16,
        marginLeft: 6
    },
    itemContainer: {
        height: 175 + 20 + 7,
        width: 129,
    },
    itemImage: {
        height: 175,
        width: 125,
        borderRadius: 5
    },
    itemTextContainer: {
        height: 20,
        marginTop: 7,
        width: 125,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        color: 'rgb(33,33,33)',
        fontSize: 14
    },
    flatList: {
        height: 179 + 20 + 7,
        width: '100%',
        marginTop: 20
    }
});