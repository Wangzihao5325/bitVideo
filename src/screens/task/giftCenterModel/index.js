import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, Text, View, FlatList, Image, Platform, ImageBackground, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';
import * as Colors from '../../../global/Colors';
import * as Sizes from '../../../global/Sizes';
import { isXDevice } from '../../../global/utils/PixelUtil';

import ModalHeader from '../../../components/modal/ModalHeader';

class Item extends PureComponent {
    render() {
        return (
            <View style={styles.itemContainer}>
                <View style={{ flex: 2 }}>
                    <Image style={styles.itemIcon} source={{ uri: this.props.url }} />
                </View>
                <View style={{ flex: 5, borderBottomColor: 'rgb(246,246,246)', borderBottomWidth: StyleSheet.hairlineWidth }}>
                    <Text style={styles.itemTitleText}>{this.props.title}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 6, marginLeft: 15, justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 14, color: 'rgb(255,190,124)' }}>{`-${this.props.coin}`}<Text style={{ color: 'rgb(169,169,169)' }}>金币</Text></Text>
                        <Text style={{ color: 'rgb(169,169,169)', fontSize: 14 }}>{`有效期:${this.props.date}`}</Text>
                    </View>
                </View>
                <View style={{ flex: 3, flexDirection: 'row-reverse', alignItems: 'center', borderBottomColor: 'rgb(246,246,246)', borderBottomWidth: StyleSheet.hairlineWidth }}>
                    <TouchableHighlight style={styles.itemBtn}>
                        <Text style={styles.btnText}>立即兑换</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

class GiftCenterModel extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: []
    }

    componentDidMount() {
        Api.getUserExchangeList((e) => {
            console.log(e);
            if (Array.isArray(e) && e.length > 0) {
                this.setState({
                    data: e
                });
            }
        });
    }

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
                        <ModalHeader goBack={this._goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title='兑换中心' rightBtnMode='none' />
                        <View style={styles.container}>
                            <ImageBackground style={styles.bannerBg} source={require('../../../image/task/coin_list_bar.png')}>
                                <Text style={{ color: 'rgb(34,34,34)', fontSize: 28 }}>{this.props.coins}</Text>
                                <Text style={{ color: 'rgb(103,103,103)', fontSize: 15, marginTop: 8, fontWeight: 'bold' }}>当前金币</Text>
                            </ImageBackground>
                        </View>

                        <View style={styles.title}>
                            <Text style={styles.titleText}>特权兑换</Text>
                        </View>
                        <FlatList
                            style={{ flex: 1 }}
                            data={this.state.data}
                            renderItem={({ item }) => <Item date={item.untile} url={item.icon} title={item.title} coin={item.coins} />}
                        />
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

export default connect(mapState2Props)(GiftCenterModel);

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
    },
    title: {
        height: 48,
        width: '100%',
        borderBottomColor: 'rgb(246,246,246)',
        borderBottomWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 16,
        color: 'rgb(34,34,34)',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    itemContainer: {
        height: 75,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    itemIcon: {
        height: 42,
        width: 42,
        marginLeft: 19,
        marginTop: 18
    },
    itemTitleText: {
        color: 'rgb(34,34,34)',
        fontSize: 14,
        marginLeft: 15,
        marginTop: 22
    },
    itemBtn: {
        height: 28,
        width: 72,
        borderRadius: 14,
        backgroundColor: 'rgb(247,203,148)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    btnText: {
        color: 'rgb(34,34,34)',
        fontSize: 13,

    }
});