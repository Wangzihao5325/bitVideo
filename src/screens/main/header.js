import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Api from '../../socket/index';
import store from '../../store/index';
import { setMainPageData, setGlobalTypeData, setPageInfo, setNowGlobalType } from '../../store/actions/mainPageDataAction';
import * as Colors from '../../global/Colors';
import * as In18 from '../../global/In18';
import * as Config from '../../global/Config';

import TabBar from '../../components/tabBar/index';
import IconBtn from '../../components/imageBtn/IconBtn';
import SearchBarBtn from '../../components/searchBar/SearchBarBtn';

export default class Header extends PureComponent {

    state = {
        recommendSearch: In18.DEFALUT_RECOMMEND_SEARCH
    };

    static contextTypes = {
        mainNavigation: PropTypes.object
    }

    componentDidMount() {
        Api.getDomain((e) => {
            Config.SERVICE_URL.domainUrl = 'http://192.168.0.186:50009';
            Api.postGlobalTypeVideo('recommend', null, (e) => {
                if (e.data) {
                    store.dispatch(setMainPageData(e.data));
                    store.dispatch(setPageInfo(e.current_page, e.last_page));
                }
            });
        });
    }

    _search = () => {
        const { mainNavigation } = this.context;
        mainNavigation.navigate('SearchModel');
    }

    _watchHistory = () => {
        const { mainNavigation } = this.context;
        mainNavigation.navigate('HistoryModel');
    }

    _watchCollect = () => {
        const { mainNavigation } = this.context;
        mainNavigation.navigate('CollectModel');
    }

    render() {
        return (
            <View style={styles.searchContainer}>
                <SearchBarBtn style={{ marginLeft: 15 }} btnPress={this._search} />
                <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                    <IconBtn onPress={this._watchCollect} style={{ marginRight: 15 }} height={26} width={26} source={require('../../image/usual/star.png')} />
                    <IconBtn onPress={this._watchHistory} style={{ marginRight: 15 }} height={26} width={26} source={require('../../image/usual/clock.png')} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    searchContainer: {
        height: 46,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    }
});