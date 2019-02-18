import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';

import ModalHeader from '../../components/modal/ModalHeader';

export default class HistoryModel extends PureComponent {
    _editMode = () => {
        console.log('change edit mode');
    }
    _goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ModalHeader goBack={this._goBack} title='我的播放记录' rightBtnMode='text' rightBtnTitle='编辑' rightBtnOnPress={this._editMode} />
            </SafeAreaView>
        );
    }
}