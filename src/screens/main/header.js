import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Api from '../../socket/index';
import * as Colors from '../../global/Colors';
import * as In18 from '../../global/In18';

import Icon from 'react-native-vector-icons/FontAwesome';
import TabBar from '../../components/tabBar/index';
import SearchBar from '../../components/searchBar/index';
import IconBtn from '../../components/imageBtn/IconBtn';

export default class Header extends PureComponent {

    state = {
        globalType: In18.DEFALUT_GLOBALE_TYPE,
        recommendSearch: In18.DEFALUT_RECOMMEND_SEARCH
    };

    showAll = () => {
        console.log('showAll is clicking!');
    }

    search = () => {
        console.log('start search');
    }

    componentDidMount() {
        Api.getGlobalType((result) => {
            console.log(result);
            let typeArr = result.map((obj) => {
                return obj.name
            });
            this.setState({ globalType: typeArr });
        });
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image style={{ height: 30, width: 40, marginLeft: 10 }} source={require('../../image/main/app_icon.png')} />
                    <TabBar tabNames={this.state.globalType} tabTap={(classfiy) => { console.log(classfiy) }} />
                    <IconBtn style={{ alignSelf: 'center', marginRight: 15 }} height={20} width={20} source={require('../../image/main/list.png')} />
                </View>
                <View style={styles.searchContainer}>
                    <SearchBar recommendText={this.state.recommendSearch} search={this.search} />
                    <Icon.Button
                        name="bars"
                        size={20}
                        color='rgb(250,214,72)'
                        backgroundColor={Colors.SAFE_AREA_BGCOLOR}
                        onPress={this.showAll}
                    >
                        {In18.ALL_TEXT}
                    </Icon.Button>
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
        flexDirection: 'row'
    }
});