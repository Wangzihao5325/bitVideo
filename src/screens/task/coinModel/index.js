import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, Platform, ImageBackground } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';
import { isXDevice } from '../../../global/utils/PixelUtil';

import ModalHeader from '../../../components/modal/ModalHeader';

class GetItem extends PureComponent {
    render() {
        let dataStr = this.props.date.split(' ')[0];
        return (
            <View style={{ height: 67, width: '100%', flexDirection: 'row', display: 'flex' }}>
                <View style={{ flex: 2, marginLeft: 24, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgb(246,246,246)' }}>
                    <Text style={{ marginTop: 17, fontSize: 13, color: 'rgb(34,34,34)' }}>{this.props.title}</Text>
                    <Text style={{ marginTop: 10, fontSize: 12, color: 'rgb(34,34,34)' }}>{dataStr}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 33, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgb(246,246,246)' }}>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                        <Text style={{ color: 'rgb(253,206,0)', fontSize: 15 }}>{`+${this.props.coin}金币`}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

class PutItem extends PureComponent {
    render() {
        let dataStr = this.props.date.split(' ')[0];
        return (
            <View style={{ height: 67, width: '100%', flexDirection: 'row', display: 'flex' }}>
                <View style={{ flex: 2, marginLeft: 24, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgb(246,246,246)' }}>
                    <Text style={{ marginTop: 17, fontSize: 13, color: 'rgb(34,34,34)' }}>{this.props.title}</Text>
                    <Text style={{ marginTop: 10, fontSize: 12, color: 'rgb(34,34,34)' }}>{dataStr}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 33, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgb(246,246,246)' }}>
                    <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                        <Text style={{ color: 'rgb(253,206,0)', fontSize: 15 }}>{`${this.props.coin}金币`}</Text>
                    </View>
                </View>
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
            if (e && e.data.length > 0) {
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
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                {this.state.data.length > 0 &&
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}
                        renderItem={({ item }) => <GetItem title={item.event_label} coin={item.value} date={item.created_at} />}
                    />
                }
            </View>
        );
    }
}

class PutPage extends PureComponent {
    state = {
        data: [],
        currentPage: -1,
        lastPage: -1,
    };

    componentDidMount() {
        Api.getIconHistoryList('put', (e) => {
            if (e && e.data.length > 0) {
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
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                {this.state.data.length > 0 &&
                    <FlatList
                        style={{ flex: 1 }}
                        data={this.state.data}
                        renderItem={({ item }) => <PutItem title={item.event_label} coin={item.value} date={item.created_at} />}
                    />
                }
            </View>
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
                backgroundColor: 'white',//TabBar 的背景颜色
                borderBottomColor: 'rgb(246,246,246)',
                borderBottomWidth: StyleSheet.hairlineWidth
            },
            indicatorStyle: {
                height: 2,
                width: 20,
                backgroundColor: 'rgb(34,34,34)',
                marginLeft: Sizes.DEVICE_WIDTH / 4 - 10
            },//标签指示器的样式
            labelStyle: {
                fontSize: 16,
                marginTop: 6,
                marginBottom: 6,
                color: 'rgb(34,34,34)',
                fontWeight: 'bold'
            },//文字的样式
        },
    }
)

const TopTab = createAppContainer(MaterialTopTabNavigator);

class IconsListModel extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    _goBack = () => {
        this.props.navigation.goBack();
    }


    render() {
        let isX = isXDevice();
        let bgImageStyle = { width: '100%', height: 207 - 20 };
        if (isX) {
            bgImageStyle = { width: '100%', height: 207 };
        }
        if (Platform.OS === 'android') {
            bgImageStyle = { width: '100%', height: 207 - 44 };
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Image
                    style={[{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }, bgImageStyle]}
                    source={require('../../../image/task/task_background.png')}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='积分' rightBtnMode='none' />
                        <View style={styles.container}>
                            <ImageBackground style={styles.bannerBg} source={require('../../../image/task/coin_list_bar.png')}>
                                <Text style={{ color: 'rgb(34,34,34)', fontSize: 28 }}>{this.props.coins}</Text>
                                <Text style={{ color: 'rgb(103,103,103)', fontSize: 15, marginTop: 8, fontWeight: 'bold' }}>当前金币</Text>
                            </ImageBackground>
                        </View>
                        <TopTab />
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        coins: store.account.icons,
    }
}

export default connect(mapState2Props)(IconsListModel);

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 337,
        alignSelf: 'center',
        marginTop: 40,
        marginBottom: 20
    },
    bannerBg: {
        height: 100,
        width: 337,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});