import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Colors from '../../global/Colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import TabBar from '../../components/tabBar/index';
import SearchBar from '../../components/searchBar/index';

export default class Header extends PureComponent {

    showAll = () => {
        console.log('showAll is clicking!');
    }

    search = () => {
        console.log('start search');
    }

    render() {
        return (
            <View style={styles.headerContainer}>
                <TabBar tabNames={['推荐', '搞笑', '电视剧', '动漫', '综艺']} tabTap={(classfiy) => { console.log(classfiy) }} />
                <View style={styles.searchContainer}>
                    <SearchBar recommendText='雷人糗事' search={this.search} />
                    <Icon.Button
                        name="bars"
                        size={20}
                        color='rgb(250,214,72)'
                        backgroundColor={Colors.SAFE_AREA_BGCOLOR}
                        onPress={this.showAll}
                    >
                        全部
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