import React, { PureComponent } from 'react';
import { SafeAreaView, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import store from '../../store/index';
import { change_history_edit_state } from '../../store/actions/watchHistoryAction';
import * as In18 from '../../global/In18';

import ModalHeader from '../../components/modal/ModalHeader';
import VideoDetailInfoWithEdit from '../../components/imageBtn/VideoDetailInfoWithEdit';

class HistoryModel extends PureComponent {
    _editMode = () => {
        store.dispatch(change_history_edit_state());
    }
    _goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        let btnText = this.props.isSelectMode ? In18.CANCEL_TEXT : In18.EDIT_TEXT;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ModalHeader goBack={this._goBack} title={In18.MY_WATCH_HISTORY} rightBtnMode='text' rightBtnTitle={btnText} rightBtnOnPress={this._editMode} />
                {this.props.data.length > 0 &&
                    <FlatList
                        data={this.props.data}
                        renderItem={({ item }) => <VideoDetailInfoWithEdit isSelect={this.props.isSelectMode} title={item.title} intro={item.intro} director={item.director} source={{ uri: item.cover_path }} navi={this.props.navigation} id={item.id} />}
                    />}
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.watchHistory.historyMovies,
        isSelectMode: store.watchHistory.isEdit,
    }
}

export default connect(mapState2Props)(HistoryModel);