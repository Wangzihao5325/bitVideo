import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput, TouchableHighlight, Text, Image, FlatList, ScrollView, SafeAreaView, Platform } from 'react-native';
import * as Sizes from '../../../global/Sizes';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import ModalHeader from '../../../components/modal/ModalHeader';
import ToastRoot from '../../../components/toast/index';
import _ from 'lodash';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import NavigationService from '../../../app/NavigationService';

const reg = { remark: '', contact: '' };

class ImageItem extends PureComponent {
    selectBtnOnPress = () => {
        if (this.props.selectTap) {
            this.props.selectTap();
        }
    }
    delePic = () => {
        if (this.props.dele) {
            this.props.dele(this.props.item.path);
        }
    }
    render() {
        if (this.props.item.size == 0) {
            return (
                <View style={{ height: 70, width: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableHighlight onPress={this.selectBtnOnPress} style={{ height: 60, width: 60 }}>
                        <Image style={{ height: 60, width: 60 }} source={require('../../../image/usual/add_image.png')} />
                    </TouchableHighlight>
                </View>
            );
        } else {
            let uri = this.props.item.path;
            if (Platform.OS === 'ios') {
                uri = this.props.item.sourceURL;
            }
            return (
                <View style={{ height: 70, width: 70, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Image resizeMode='stretch' style={{ height: 60, width: 60 }} source={{ uri: uri }} />
                    <TouchableHighlight onPress={this.delePic} style={{ height: 15, width: 15, position: 'absolute', top: 0, right: 0, display: 'flex' }}>
                        <Image style={{ height: 15, width: 15 }} source={require('../../../image/usual/image_del.png')} />
                    </TouchableHighlight>
                </View>
            );
        }
    }
}

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

//const TestData = [['视频加载速度慢/不出来', '视频播放失败/卡顿'], ['没有喜欢的视频', '没有喜欢的演员', '充值失败'], ['充值后会员未到账', '金币兑换未到账', '金币丢失'], ['账号丢失', '其他问题']];

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
        selectNum: 0,
        imageSelectData: [{ size: 0 }],
        test: null
    }

    componentDidMount() {
        Api.feedbackQuestionList((e) => {
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

    _selectPic = () => {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: 3
        }).then(images => {
            if (images.length < 3) {
                images.push({ size: 0 });
            }
            this.setState({
                imageSelectData: images
            });
        }).catch(e => {
            //
        });
    }

    _delePic = (path) => {
        let { imageSelectData } = this.state;
        let deleIndex = -1;
        imageSelectData.every((item, index) => {
            if (item.path === path) {
                deleIndex = index;
                return false;
            } else {
                return true;
            }
        })
        if (deleIndex >= 0) {
            imageSelectData.splice(deleIndex, 1);
            let newData = imageSelectData.concat();
            if (newData[newData.length - 1].size !== 0) {
                newData.push({ size: 0 });
            }
            this.setState({
                imageSelectData: newData
            });
        }
    }

    _submit = () => {
        NavigationService.navigate('IndicatorScreen');
        let imageSelectData = this.state.imageSelectData.concat();
        if (imageSelectData[imageSelectData.length - 1].size == 0) {
            imageSelectData.pop();
        }
        if (imageSelectData.length > 0) {
            let length = imageSelectData.length;
            let imageArr = [];

            if (imageSelectData.length == 1) {
                let uri = imageSelectData[0].path;
                if (Platform.OS === 'ios') {
                    uri = imageSelectData[0].sourceURL;
                }
                Api.uploadPic(uri, (e, code, message) => {
                    if (message == 'success') {
                        imageArr.push(e);

                        //do sth
                        this._submitText(imageArr);
                    }
                });
            }

            if (imageSelectData.length == 2) {
                let uri = imageSelectData[0].path;
                if (Platform.OS === 'ios') {
                    uri = imageSelectData[0].sourceURL;
                }
                Api.uploadPic(uri, (e, code, message) => {
                    if (message == 'success') {
                        imageArr.push(e);
                        let uri2 = imageSelectData[1].path;
                        if (Platform.OS === 'ios') {
                            uri2 = imageSelectData[1].sourceURL;
                        }
                        Api.uploadPic(uri2, (e, code, message) => {
                            if (message == 'success') {
                                imageArr.push(e);
                                // do sth
                                this._submitText(imageArr);
                            }
                        });

                    }
                });
            }

            if (imageSelectData.length == 3) {
                let uri = imageSelectData[0].path;
                if (Platform.OS === 'ios') {
                    uri = imageSelectData[0].sourceURL;
                }
                Api.uploadPic(uri, (e, code, message) => {
                    if (message == 'success') {
                        imageArr.push(e);
                        let uri2 = imageSelectData[1].path;
                        if (Platform.OS === 'ios') {
                            uri2 = imageSelectData[1].sourceURL;
                        }
                        Api.uploadPic(uri2, (e, code, message) => {
                            if (message == 'success') {
                                imageArr.push(e);
                                let uri3 = imageSelectData[2].path;
                                if (Platform.OS === 'ios') {
                                    uri3 = imageSelectData[2].sourceURL;
                                }
                                Api.uploadPic(uri3, (e, code, message) => {
                                    if (message == 'success') {
                                        imageArr.push(e);
                                        //do sth
                                        this._submitText(imageArr);
                                    }
                                });
                            }
                        });

                    }
                });
            }
        }
        this._submitText(null);

    }

    _submitText = (imageArr) => {
        let newImageArr = imageArr ? imageArr : null;
        let keyArr = [];
        this.state.selectTab.forEach((item) => {
            let key = this.state.mapObj[item];
            keyArr.push(key);
        });
        let newKeyArr = null;
        if (keyArr.length > 0) {
            newKeyArr = newKeyArr;
        }

        Api.submitFeedback(reg.remark, reg.contact, newImageArr, newKeyArr, (e, code, message) => {
            NavigationService.navigate('HelpScreen');
            ToastRoot.show('我们已经收到反馈信息，请您耐心等候');
            this.props.navigation.pop();
        });
    }

    remarkTextChange = (e) => {
        reg.remark = e;
    }

    contactTextChange = (e) => {
        reg.contact = e;
    }

    componentWillUnmount() {
        reg.remark = '';
        reg.contact = '';
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this._goBack} backBtnColor='rgb(255,255,255)' title='意见反馈' rightBtnMode='none' />
                <KeyboardAwareScrollView>
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ color: 'rgb(72,88,96)', marginTop: 17, marginLeft: 15, marginBottom: 10 }}>{`请选择问题出现场景${this.state.selectNum}/3(必选)`}</Text>
                        <FlatList
                            extraData={this.state}
                            data={this.state.data}//this.state.data
                            renderItem={({ item }) => <Item selectTab={this.state.selectTab} callback={this.someBtnIsPress} item={item} />}
                        />
                        <View style={{ marginTop: 20, height: 180, width: Sizes.DEVICE_WIDTH - 24, display: 'flex', alignSelf: 'center', backgroundColor: 'rgb(24,32,26)' }}>
                            <TextInput
                                onChangeText={this.remarkTextChange}
                                style={{ height: 100, width: Sizes.DEVICE_WIDTH - 24, paddingHorizontal: 15, paddingTop: 15, color: 'white' }}
                                placeholderTextColor='rgb(72,88,96)'
                                placeholder='请用10~200字描述问题的详细情况,有助于我们快速帮您解决'
                                multiline={true}
                            />
                            {/* <TouchableHighlight onPress={this._selectPic} style={{ height: 30, width: 30, backgroundColor: 'red' }} ><Text>12</Text></TouchableHighlight>
                        {this.state.test && <Image style={{ height: 30, width: 30 }} source={this.state.test} />} */}
                            <FlatList
                                style={{ height: 70, width: Sizes.DEVICE_WIDTH - 34, marginLeft: 5, marginTop: 5 }}
                                horizontal={true}
                                data={this.state.imageSelectData}
                                renderItem={({ item }) => <ImageItem dele={this._delePic} selectTap={this._selectPic} item={item} />}
                            />
                        </View>
                        <TextInput onChangeText={this.contactTextChange} style={{ color: 'white', alignSelf: 'center', marginTop: 11, height: 50, width: Sizes.DEVICE_WIDTH - 24, paddingHorizontal: 15, backgroundColor: 'rgb(24,32,26)' }} placeholder='邮箱/Telegram/Potato,方便我们联系(选填)' placeholderTextColor='rgb(72,88,96)' />
                        <TouchableHighlight onPress={this._submit} style={{ borderRadius: 21, marginTop: 20, height: 42, width: Sizes.DEVICE_WIDTH - 64, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(255,168,96)' }} underlayColor='transparent'>
                            <Text style={{ fontSize: 18, color: 'rgb(22,24,36)' }}>提交</Text>
                        </TouchableHighlight>
                    </ScrollView>
                </KeyboardAwareScrollView>
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