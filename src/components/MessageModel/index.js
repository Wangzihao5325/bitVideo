import React, { Component } from 'react';
import { View, Modal, Image, TouchableHighlight, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';

class MessageModel extends Component {

    _unshow = () => {
        store.dispatch({ type: 'MESSAGE_MODEL_SHOW_STATE_CHANGE', state: false });
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isShow}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ borderRadius: 5, height: 224, width: 242, backgroundColor: 'rgb(252,252,252)', display: 'flex', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'rgb(34,34,34)', marginTop: 23 }}>新用户专享</Text>
                        <View style={{ height: 26, width: 90, justifyContent: 'center', flexDirection: 'row', marginTop: 27 }}>
                            <Text style={{ fontSize: 24, color: 'rgb(253,206,0)' }}>+20</Text>
                            <Image style={{ height: 26, width: 26, marginLeft: 2, marginTop: 2 }} source={require('../../image/task/icons.png')} />
                        </View>
                        <Text style={{ color: 'rgb(71,71,71)', fontSize: 14, marginTop: 25 }}>已为您兑换每日9次观影特权</Text>
                        <Text style={{ color: 'rgb(71,71,71)', fontSize: 14, marginTop: 3 }}>7天内有效，快去看片吧</Text>
                        <TouchableHighlight onPress={this._unshow} style={{ height: 37, width: 196, display: 'flex', marginTop: 21, backgroundColor: 'rgb(255,184,117)', borderRadius: 18, display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 14, color: 'rgb(33,45,49)' }}>知道了</Text></TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

function mapState2Props(store) {
    return {
        isShow: store.model.messageModelIsShow,
    }
}

export default connect(mapState2Props)(MessageModel);

const styles = StyleSheet.create({
    btn: {
        height: 30,
        width: 50,
        position: 'absolute',
        top: 40,
        left: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    btnTitle: {
        fontSize: 10,
        color: 'white'
    }
});