import React, { Component } from 'react';
import { View, Modal, Image } from 'react-native';

export default class SplashModel extends Component {
    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.isVisable}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <Image style={{ flex: 1 }} source={this.props.source} />
                </View>
            </Modal>
        );
    }
}