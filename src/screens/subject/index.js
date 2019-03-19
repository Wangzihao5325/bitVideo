import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import * as In18 from '../../global/In18';
import * as Sizes from '../../global/Sizes';
import * as Colors from '../../global/Colors';

import IdolTabList from './IdolTabList';
import TitleHeader from '../../components/titleHeader/index';
import HotSubject from './HotSubject';

class RecommandTab extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <Text style={styles.titleText}>{In18.HOT_TAG}</Text>
                <IdolTabList />
                <TitleHeader
                    imageSource={require('../../image/subject/hot_subject.png')}
                    title={In18.HOT_SUBJECT}
                    btnTitle={In18.MORE_TEXT}
                    showMore={() => { console.log('11223344') }} />
                <HotSubject />
            </View>
        );
    }
}

class AllTab extends PureComponent {
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>

            </View>
        );
    }
}

const MaterialTopTabNavigator = createMaterialTopTabNavigator({//在这里配置页面的路由
    RecommandTab: {
        screen: RecommandTab,
        navigationOptions: {
            tabBarLabel: In18.RECOMMAND_SUBJECT
        }
    },
    AllTab: {
        screen: AllTab,
        navigationOptions: {
            tabBarLabel: In18.ALL_SUBJECT,
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
                backgroundColor: Colors.SCREEN_BGCOLOR,//TabBar 的背景颜色
            },
            indicatorStyle: {
                height: 2,
                width: 20,
                backgroundColor: Colors.NAVI_ACTIVE_TINT_COLOR,
                marginLeft: Sizes.DEVICE_WIDTH / 4 - 10,
                borderRadius: 1
            },//标签指示器的样式
            labelStyle: {
                fontSize: 16,
                marginTop: 6,
                marginBottom: 6,
                color: Colors.NAVI_ACTIVE_TINT_COLOR,
                fontWeight: 'bold'
            },//文字的样式
        },
    }
)

const TopTab = createAppContainer(MaterialTopTabNavigator);

export default class SubjectScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <TopTab />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    titleText: {
        marginTop: 18,
        marginBottom: 14,
        marginLeft: 15,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
});