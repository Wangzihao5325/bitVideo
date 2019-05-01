import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, Text, ImageBackground, FlatList, ScrollView, SafeAreaView } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import ModalHeader from '../../../components/modal/ModalHeader';
import ToastRoot from '../../../components/toast/index';
import _ from 'lodash';

const reg = { title: '', contact: '' };

class Btn extends PureComponent {

    state = {
        isHighlight: false
    }

    _btnPress = () => {
        if (!this.state.isHighlight && this.props.selectTab.length >= 3) {
            return;
        } else {
            if (this.props.pressCallBack) {
                this.setState((preState) => {
                    let newState = !preState.isHighlight;
                    return {
                        isHighlight: newState
                    }
                }, (e) => {
                    this.props.pressCallBack(this.props.title, this.state.isHighlight);
                });
            }
        }
    }

    render() {
        let containerStyle = this.state.isHighlight ? { backgroundColor: 'rgb(255,168,96)' } : { backgroundColor: 'rgb(51,57,62)' };
        let textStyle = this.state.isHighlight ? { color: 'rgb(16,18,29)' } : { color: 'white' };
        return (
            <View style={[{ borderRadius: 17, marginHorizontal: 4, height: 35, paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center' }, containerStyle]}>
                <Text onPress={this._btnPress} style={[{ fontSize: 13 }, textStyle]}>{this.props.title}</Text>
            </View>
        );
    }
}

class Item extends PureComponent {
    state = {
        content: null
    }

    _someBtnIsPressed = (title, state) => {
        if (this.props.callback) {
            this.props.callback(title, state);
        }
    }

    componentDidMount() {
        let contents = [];
        this.props.item.forEach((e, index) => {
            let innerItemComponent = <Btn selectTab={this.props.selectTab} pressCallBack={this._someBtnIsPressed} key={e} title={e} />;
            contents.push(innerItemComponent);
        });
        this.setState({
            content: contents
        });
    }
    render() {
        return (
            <View style={{ height: 45, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {this.state.content}
            </View>
        );
    }
}

const TestData = [['视频加载速度慢/不出来', '视频播放失败/卡顿'], ['没有喜欢的视频', '没有喜欢的演员', '充值失败'], ['充值后会员未到账', '金币兑换未到账', '金币丢失'], ['账号丢失', '其他问题']];

export default class HelpScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        mapObj: {},
        data: [],
        selectTab: [],
        selectNum: 0
    }

    componentDidMount() {
        Api.feedbackQuestionList((e) => {
            console.log(e);
            let valueKeyMap = {};
            let flatListDataArr = [];
            let totalLength = 0;
            let lineArr = [];
            e.forEach((item) => {
                valueKeyMap[item.value] = item.key;
                let length = item.value.length * 13 + 32;
                if (totalLength + length < Sizes.DEVICE_WIDTH) {
                    lineArr.push(item.value);
                    totalLength = totalLength + length;
                } else {
                    flatListDataArr.push(lineArr);
                    lineArr = [];
                    lineArr.push(item.value);
                    totalLength = length;
                }
            });

            this.setState({
                mapObj: valueKeyMap,
                data: flatListDataArr
            });
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    someBtnIsPress = (title, state) => {
        let { selectTab } = this.state;
        if (state) {
            selectTab.push(title);
            this.setState({
                selectTab: selectTab,
                selectNum: selectTab.length
            });
        } else {
            _.pull(selectTab, title);
            this.setState({
                selectTab: selectTab,
                selectNum: selectTab.length
            });
        }
    }

    render() {
        let number = this.state.selectTab.length;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this._goBack} backBtnColor='rgb(255,255,255)' title='意见反馈' rightBtnMode='none' />
                <ScrollView style={{ flex: 1 }}>
                    <Text style={{ color: 'rgb(72,88,96)', marginTop: 17, marginLeft: 15 }}>{`请选择问题出现场景${this.state.selectNum}/3(必选)`}</Text>
                    <FlatList
                        extraData={this.state}
                        data={TestData}//this.state.data
                        renderItem={({ item }) => <Item selectTab={this.state.selectTab} callback={this.someBtnIsPress} item={item} />}
                    />
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.SCREEN_BGCOLOR
    },
    flexView: {
        marginTop: 40,
        display: 'flex',
        height: 199,
        width: Sizes.DEVICE_WIDTH - 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'rgb(255,216,169)',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    mainInput: {
        height: 199 - 40,
        width: Sizes.DEVICE_WIDTH - 30 - 40,
        textAlignVertical: 'top',
        alignSelf: 'center'
    },
    flexView2: {
        marginTop: 20,
        display: 'flex',
        height: 60,
        width: Sizes.DEVICE_WIDTH - 30,
        marginHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,216,169)',
        borderRadius: 5,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
    },
    input2: {
        height: 40,
        width: Sizes.DEVICE_WIDTH - 30 - 40,
    },
    btnBg: {
        height: 40,
        width: Sizes.DEVICE_WIDTH - 42 - 58,
        marginTop: 40,
        marginLeft: 42,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'rgb(50,30,13)',
        fontSize: 16
    }
});