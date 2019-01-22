import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Api from '../../socket/index';
import store from '../../store/index';
import { setMainPageData, setGlobalTypeData, setNowGlobalType } from '../../store/actions/mainPageDataAction';
import * as Colors from '../../global/Colors';
import * as In18 from '../../global/In18';

import TabBar from '../../components/tabBar/index';
import IconBtn from '../../components/imageBtn/IconBtn';
import SearchBarBtn from '../../components/searchBar/SearchBarBtn';

export default class Header extends PureComponent {

    state = {
        globalType: In18.DEFALUT_GLOBALE_TYPE,
        recommendSearch: In18.DEFALUT_RECOMMEND_SEARCH
    };

    componentDidMount() {
        Api.getGlobalType((result) => {
            console.log(result);
            store.dispatch(setGlobalTypeData(result));
            let typeArr = result.map((obj) => {
                return obj.name
            });
            this.setState({ globalType: typeArr });
            let defalutType = result[0].key;
            store.dispatch(setNowGlobalType(defalutType));
            Api.postGlobalTypeVideo(defalutType, (e) => {
                console.log(e);
                if (e.data) {
                    store.dispatch(setMainPageData(e.data));

                }
            })
        });
    }

    showAll = () => {
        console.log('showAll is clicking!');
    }

    search = () => {
        console.log('start search');
    }

    classifyChanged = (classify) => {
        console.log(classify);
        console.log('11223344');
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
                    <SearchBarBtn style={{ marginLeft: 15 }} />
                    <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <IconBtn style={{ marginRight: 15 }} height={26} width={26} source={require('../../image/usual/star.png')} />
                        <IconBtn style={{ marginRight: 15 }} height={26} width={26} source={require('../../image/usual/clock.png')} />
                    </View>
                </View>
            </View>
        );
    }
}

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