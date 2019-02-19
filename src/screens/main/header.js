import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Api from '../../socket/index';
import store from '../../store/index';
import { setMainPageData, setGlobalTypeData, setPageInfo, setNowGlobalType } from '../../store/actions/mainPageDataAction';
import * as Colors from '../../global/Colors';
import * as In18 from '../../global/In18';

import TabBar from '../../components/tabBar/index';
import IconBtn from '../../components/imageBtn/IconBtn';
import SearchBarBtn from '../../components/searchBar/SearchBarBtn';

class Header extends PureComponent {

    state = {
        globalType: In18.DEFALUT_GLOBALE_TYPE,
        recommendSearch: In18.DEFALUT_RECOMMEND_SEARCH
    };

    static contextTypes = {
        mainNavigation: PropTypes.object
    }

    componentDidMount() {
        Api.getGlobalType((result) => {
            store.dispatch(setGlobalTypeData(result));
            let typeArr = result.map((obj) => {
                return obj.name
            });
            this.setState({ globalType: typeArr });
            let defalutType = result[0].key;
            // store.dispatch(setNowGlobalType(defalutType));设置data时会自动设置type
            Api.postGlobalTypeVideo(defalutType, null, (e) => {
                if (e.data) {
                    console.log('origin data');
                    console.log(e);
                    store.dispatch(setMainPageData(e.data));
                    store.dispatch(setPageInfo(e.current_page, e.last_page));
                }
            });
        });
    }

    showAll = () => {
        console.log('showAll is clicking!');
    }

    _search = () => {
        const { mainNavigation } = this.context;
        mainNavigation.navigate('SearchModel');
    }

    classifyChanged = (classify) => {
        if (this.props.typeArr) {
            let reg = this.props.typeArr.filter((item) => {
                return item.name === classify;
            });
            if (reg.length > 0) {
                let typeKey = reg[0].key;
                Api.postGlobalTypeVideo(typeKey, null, (e) => {
                    if (e.data) {
                        store.dispatch(setMainPageData(e.data));
                        store.dispatch(setPageInfo(e.current_page, e.last_page));
                    }
                });
            }
        }
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
            <View style={styles.headerContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image style={{ height: 30, width: 40, marginLeft: 10 }} source={require('../../image/main/app_icon.png')} />
                    <TabBar tabNames={this.state.globalType} tabTap={this.classifyChanged} />
                    <IconBtn style={{ alignSelf: 'center', marginRight: 15 }} height={20} width={20} source={require('../../image/main/list.png')} />
                </View>
                <View style={styles.searchContainer}>
                    <SearchBarBtn style={{ marginLeft: 15 }} btnPress={this._search} />
                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <IconBtn onPress={this._watchCollect} style={{ marginRight: 15 }} height={26} width={26} source={require('../../image/usual/star.png')} />
                        <IconBtn onPress={this._watchHistory} style={{ marginRight: 15 }} height={26} width={26} source={require('../../image/usual/clock.png')} />
                    </View>
                </View>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        typeArr: store.mainPageData.typeArr
    }
}

export default connect(mapState2Props)(Header);

const styles = StyleSheet.create({
    headerContainer: {
        display: 'flex',
        height: 80,
        backgroundColor: Colors.SAFE_AREA_BGCOLOR
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 6
    }
});