import React, { Component } from 'react';
import { View, Modal, Image, TouchableHighlight, Text, StyleSheet } from 'react-native';

export default class SplashModel extends Component {
    state = {
        isVisable: true,
        time: 10
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.time == 0) {
                this.setState({ isVisable: false });
                clearInterval(this.timer);
            } else {
                this.setState((preState, props) => {
                    let nowTime = preState.time - 1;
                    return {
                        time: nowTime
                    }
                });
            }
        }, 1000);
    }

    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    _closeSplashModel = () => {
        this.setState({ isVisable: false });
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isVisable}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <TouchableHighlight onPress={this._closeSplashModel} style={styles.btn}>
                        <Text style={styles.btnTitle}>{`${this.state.time}秒`}</Text>
                    </TouchableHighlight>
                    {typeof this.props.source.uri === 'string' &&
                        this.props.source.uri !== '' &&
                        <Image style={{ flex: 1 }} source={this.props.source} />}
                </View>
            </Modal>
        );
    }
}

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