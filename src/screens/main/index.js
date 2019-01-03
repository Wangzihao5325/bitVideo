import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import * as Colors from '../../global/Colors';

import Icon from 'react-native-vector-icons/FontAwesome';
import TabBar from '../../components/tabBar/index';
import SearchBar from '../../components/searchBar/index';

export default class MainScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };
    showAll = () => {
        console.log('showAll is clicking!');
    }
    render() {

        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TabBar tabNames={['推荐', '搞笑', '电视剧', '动漫', '综艺']} tabTap={(classfiy) => { console.log(classfiy) }} />
                        <View style={styles.searchContainer}>
                            <SearchBar recommendText='雷人糗事'/>
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
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.SAFE_AREA_BGCOLOR
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
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