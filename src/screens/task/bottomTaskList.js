import React, { PureComponent } from 'react';
import { View, Text, Image, ScrollView, TouchableHighlight, StyleSheet, ImageBackground } from 'react-native';
import Api from '../../socket/index';
import PropTypes from 'prop-types';
import ToastRoot from '../../components/toast/index';
import { NavigationEvents } from 'react-navigation';
import { get_user_info } from '../../store/actions/accountAction';
import store from '../../store/index';

const Header = function (props) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{props.title}</Text>
        </View>
    );
}

class Item extends PureComponent {

    static contextTypes = {
        taskNavigation: PropTypes.object
    }

    _onPress = () => {
        let callbackReg = this.props.refreshCallBack;
        const { taskNavigation } = this.context;
        if (this.props.sign == 0 || this.props.sign == 1) {
            switch (this.props.type) {
                case 'SAVE_PHOTO':
                    taskNavigation.navigate('QrCodeModel');
                    break;
                case 'BIND_MOBILE':
                    taskNavigation.navigate('BindPhoneModel');
                    break;
                case 'DAILY_SHARED':
                    taskNavigation.navigate('QrCodeModel');
                    break;
                case 'CLICK_AD':
                    taskNavigation.navigate('MainScreen');
                    break;
                case 'INVITE_REGISTER':
                    taskNavigation.navigate('QrCodeModel');
                    break;
                case 'LOOKED_VIDEO_SATISFY':
                    taskNavigation.navigate('MainScreen');
                    break;
                case 'SAILY_SIGN_IN':
                    Api.postTaskAndExchange(this.props.type, (e, code, message) => {
                        if (message === 'success') {
                            if (callbackReg) {
                                Api.getTaskList((e) => {
                                    callbackReg(e);
                                });
                            }
                        }
                    });
                    break;
            }
        } else if (this.props.sign == 2) {
            Api.postTaskCoins(this.props.type, (e, code, message) => {
                if (message === 'success') {
                    if (this.props.refreshCallBack) {
                        Api.getTaskList((e) => {
                            this.props.refreshCallBack(e)
                        });
                    }
                    Api.getUserInfo((e, code, message) => {
                        if (e) {
                            store.dispatch(get_user_info(e));
                        }
                    });
                }
            });
        } else {
            ToastRoot.show('您已经领取过该项福利!')
            // do nothing
        }
    }

    render() {
        let btnText = '';
        let btnColor = null;
        let btnTextColor = { color: 'rgb(34,34,34)' };
        switch (this.props.sign) {
            case 0:
                if (this.props.type === 'SAILY_SIGN_IN') {
                    btnText = '立即签到';
                } else {
                    btnText = '去做任务';
                }

                btnColor = { backgroundColor: 'rgb(247,203,148)' };
                btnTextColor = { color: 'rgb(34,34,34)' }
                break;
            case 1:
                btnText = '继续完成';
                btnColor = { backgroundColor: 'rgb(247,203,148)' };
                btnTextColor = { color: 'rgb(34,34,34)' }
                break;
            case 2:
                btnText = '领取奖励';
                btnColor = { backgroundColor: 'rgb(33,45,49)' };
                btnTextColor = { color: 'rgb(255,255,255)' }
                break;
            case 3:
                btnText = '任务完成';
                btnColor = { backgroundColor: 'rgb(33,45,49)' };
                btnTextColor = { color: 'rgb(255,255,255)' }
                break;
        }
        return (
            <View style={styles.itemContainer}>
                <Image style={styles.itemIcon} source={{ uri: this.props.iconSource }} />
                <View style={{ flex: 2 }}>
                    <Text style={styles.itemTitle}>{this.props.title}</Text>
                    <Text style={{ color: 'rgb(255,197,10)', fontSize: 14, marginLeft: 15, marginTop: 11 }}>{`+${this.props.coins}`}<Text style={{ color: 'rgb(169,169,169)', fontSize: 14 }}>金币奖励</Text></Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableHighlight style={[styles.itemBtn, btnColor]} onPress={this._onPress} underlayColor='transparent'>
                        <Text style={[styles.btnText, btnTextColor]}>{btnText}</Text>
                    </TouchableHighlight>
                    <Text style={{ color: 'rgb(155,155,155)', fontSize: 11, marginTop: 5 }}>已完成<Text style={{ color: 'rgb(255,168,96)' }}>{this.props.has}</Text></Text>
                </View>
            </View>
        );
    }
}

const ModuleGenerate = function (props) {
    let items = props.data.map((item, index) => {
        return (<Item refreshCallBack={props.refreshCallBack} key={index} iconSource={item.icon} coins={item.coins} title={item.title} sign={item.sign} has={item.has} type={item.key} />)
    });
    let containerHeight = props.data.length * 75 + 45 + 5;
    return (
        <View style={{ height: containerHeight, width: '100%' }}>
            <Header title={props.title} />
            {items}
            <View style={{ height: 5, width: '100%', backgroundColor: 'rgb(246,246,246)' }} />
        </View>
    );
}

export default class bottomTaskList extends PureComponent {
    state = {
        daily: null,
        extend: null,
        welfare: null
    };
    componentDidMount() {
        Api.getTaskList((e) => {
            if (e instanceof Array) {
                let daily = e.filter((item) => {
                    return item.group == 'daily';
                });
                let extend = e.filter((item) => {
                    return item.group == 'extend';
                });
                let welfare = e.filter((item) => {
                    return item.group == 'welfare';
                });
                this.setState({
                    daily,
                    extend,
                    welfare
                });
            }
        });
    }

    _refresh = (e) => {
        if (e instanceof Array) {
            let daily = e.filter((item) => {
                return item.group == 'daily';
            });
            let extend = e.filter((item) => {
                return item.group == 'extend';
            });
            let welfare = e.filter((item) => {
                return item.group == 'welfare';
            });
            this.setState({
                daily,
                extend,
                welfare
            });
        }
    }

    _onDidFocus = () => {
        Api.getTaskList((e) => {
            if (e instanceof Array) {
                let daily = e.filter((item) => {
                    return item.group == 'daily';
                });
                let extend = e.filter((item) => {
                    return item.group == 'extend';
                });
                let welfare = e.filter((item) => {
                    return item.group == 'welfare';
                });
                this.setState({
                    daily,
                    extend,
                    welfare
                });
            }
        });
    }

    render() {
        let modules = [];
        let height = 0;
        if (Array.isArray(this.state.extend) && this.state.extend.length > 0) {
            let extendModule = <ModuleGenerate refreshCallBack={this._refresh} key={'1'} data={this.state.extend} title='推广任务' />;
            modules.push(extendModule);
            height = height + this.state.extend.length * 75 + 45 + 5;
        }
        if (Array.isArray(this.state.welfare) && this.state.welfare.length > 0) {
            let welfareModule = <ModuleGenerate refreshCallBack={this._refresh} key={'2'} data={this.state.welfare} title='福利任务' />;
            modules.push(welfareModule);
            height = height + this.state.welfare.length * 75 + 45 + 5;
        }
        if (Array.isArray(this.state.daily) && this.state.daily.length > 0) {
            let dailyModule = <ModuleGenerate refreshCallBack={this._refresh} key={'3'} data={this.state.daily} title='日常任务' />;
            modules.push(dailyModule);
            height = height + this.state.daily.length * 75 + 45 + 5;
        }

        return (
            <ScrollView showsVerticalScrollIndicator={false}>
                <NavigationEvents
                    onDidFocus={this._onDidFocus}
                />
                {modules}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 45,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        borderBottomColor: 'rgb(246,246,246)',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    headerText: {
        fontSize: 16,
        color: 'rgb(34,34,34)',
        marginLeft: 19,
        fontWeight: 'bold'
    },
    itemContainer: {
        height: 75,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    itemIcon: {
        height: 41,
        width: 41,
        marginLeft: 23,
        marginTop: 18
    },
    itemTitle: {
        fontSize: 15,
        marginLeft: 15,
        color: 'rgb(34,34,34)',
        marginTop: 18,
    },
    itemBtn: {
        height: 28,
        width: 72,
        borderRadius: 14,
        backgroundColor: 'rgb(247,203,148)',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16
    },
    btnText: {
        color: 'rgb(34,34,34)',
        fontSize: 13,

    }
});