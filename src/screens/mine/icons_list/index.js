import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';

class GetItem extends PureComponent {
    render() {
        return (
            <View>
            </View>
        );
    }
}

class GetPage extends PureComponent {
    state = {
        data: [],
        currentPage: -1,
        lastPage: -1,
    };

    componentDidMount() {
        Api.getIconHistoryList('get', (e) => {
            if (e) {
                this.setState({
                    data: e.data,
                    currentPage: e.current_page,
                    lastPage: e.last_page
                });
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'red' }} >
                <FlatList
                    data={this.state.data}
                    renderItem={}
                />
            </View>
        );
    }
}

class PutPage extends PureComponent {
    componentDidMount() {
        Api.getIconHistoryList('put', (e) => {
            if (e) {
                console.log('put');
                console.log(e);
            }
        });
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'yellow' }} />
        );
    }
}

const MaterialTopTabNavigator = createMaterialTopTabNavigator({//在这里配置页面的路由
    GetPage: {
        screen: GetPage,
        navigationOptions: {
            tabBarLabel: In18.GET_RECORD
        }
    },
    PutPage: {
        screen: PutPage,
        navigationOptions: {
            tabBarLabel: In18.EXPENSES_RECORD,
        }
    },
},
    {
        tabBarOptions: {
            tabStyle: {
                width: Sizes.DEVICE_WIDTH / 2
            },
            upperCaseLabel: false,//是否使标签大写，默认为true
            scrollEnabled: true,//是否支持 选项卡滚动，默认false
            // activeTintColor: 'white',//label和icon的前景色 活跃状态下（选中）
            // inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）
            style: {
                backgroundColor: '#678',//TabBar 的背景颜色
            },
            indicatorStyle: {
                height: 2,
                width: 10,
                backgroundColor: 'white',
                marginLeft: Sizes.DEVICE_WIDTH / 4 - 5
            },//标签指示器的样式
            labelStyle: {
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6,
            },//文字的样式
        },
    }
)

const TopTab = createAppContainer(MaterialTopTabNavigator);

export default class IconsListScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.ICON_LIST_TITLE,  //header标题
            headerStyle: {
                borderBottomColor: Colors.SCREEN_BGCOLOR,
                backgroundColor: Colors.SCREEN_BGCOLOR
            },
            headerTintColor: Colors.NAVI_ACTIVE_TINT_COLOR,
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.container}></View>
                    <TopTab />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: '100%',
        backgroundColor: 'white'
    }
});