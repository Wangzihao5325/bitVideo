import React, { PureComponent } from 'react';
import { View, StatusBar, StyleSheet, TouchableHighlight, Image, Text } from 'react-native';
import Api from '../../socket/index';

export default class AdModel extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        time: 5,
        uri: null
    }

    componentDidMount() {
        //获取开屏动画
        Api.getSplashScreen((result) => {
            if (result.ad_path) {
                this.setState({
                    uri: result.ad_path
                });
            }
        });

        this.timer = setInterval(() => {
            if (this.state.time == 0) {
                this.props.navigation.goBack();
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
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <StatusBar hidden={true} />
                <TouchableHighlight onPress={this._closeSplashModel} style={styles.btn}>
                    <Text style={styles.btnTitle}>{`点击跳过 ${this.state.time}秒`}</Text>
                </TouchableHighlight>
                {typeof this.state.uri === 'string' &&
                    this.state.uri !== '' &&
                    <Image style={{ flex: 1 }} source={{ uri: this.state.uri }} />}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    btn: {
        height: 30,
        width: 70,
        position: 'absolute',
        top: 40,
        right: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        backgroundColor: 'rgba(34,34,34,0.3)',
        borderRadius: 5
    },
    btnTitle: {
        fontSize: 10,
        color: 'white'
    }
});