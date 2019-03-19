import React, { PureComponent } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    FlatList,
    Text
} from 'react-native';
import store from '../../store/index';
import { connect } from 'react-redux';
import {
    change_collect_edit_state,
    collect_edit_select_all,
    collect_clear_state,
    get_collect_movie_list
} from '../../store/actions/userCollectAction';
import Api from '../../socket/index';
import * as In18 from '../../global/In18';
import * as Colors from '../../global/Colors';

import ModalHeader from '../../components/modal/ModalHeader';
import { VideoDetailInfoWithEditByCollect } from '../../components/imageBtn/VideoDetailInfoWithEdit';

class BottomBtn extends PureComponent {

    _selectAll = () => {
        store.dispatch(collect_edit_select_all());
    }

    _deleteWatchHistory = () => {
        let reg = [...this.props.deleteSet];
        if (reg.length > 0) {
            Api.postCancelCollectArr(reg, (result, code, message) => {
                if (message == 'success') {
                    Api.getUserCollectList((e) => {
                        if (e) {
                            store.dispatch(get_collect_movie_list(e.data));
                        }
                    });
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.bottomContainer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 14 }} onPress={this._selectAll}>{In18.SELECT_ALL}</Text>
                </View>
                <View style={{ width: 1, height: 15, backgroundColor: 'rgb(191,191,191)' }} />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: Colors.HEADER_TITLE_COLOR, fontSize: 14 }} onPress={this._deleteWatchHistory}>{In18.DELETE}</Text>
                </View>
            </View>
        );
    }
}
class CollectModel extends PureComponent {
    componentDidMount() {
        Api.getUserCollectList((e) => {
            if (e) {
                store.dispatch(get_collect_movie_list(e.data));
            }
        });
    }

    componentWillUnmount() {
        store.dispatch(collect_clear_state());
    }

    _editMode = () => {
        store.dispatch(change_collect_edit_state());
    }
    _goBack = () => {
        this.props.navigation.goBack();
    }
    render() {
        let btnText = this.props.isSelectMode ? In18.CANCEL_TEXT : In18.EDIT_TEXT;
        let bottomBg = this.props.isSelectMode ? { backgroundColor: 'rgb(51,57,62)' } : { backgroundColor: Colors.SCREEN_BGCOLOR };
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ position: 'absolute', top: 0, width: '100%', height: 100, backgroundColor: Colors.SCREEN_BGCOLOR }} />
                <View style={[{ position: 'absolute', bottom: 0, width: '100%', height: 100 }, bottomBg]} />
                <View style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                    <ModalHeader goBack={this._goBack} title={In18.MY_COLLECT} rightBtnMode='text' rightBtnTitle={btnText} rightBtnOnPress={this._editMode} />
                    {this.props.data.length > 0 &&
                        <FlatList
                            style={styles.listStyle}
                            data={this.props.data}
                            renderItem={({ item }) => <VideoDetailInfoWithEditByCollect isSelect={this.props.isSelectMode} title={item.title} intro={item.intro} director={item.director} source={{ uri: item.cover_path }} navi={this.props.navigation} id={item.id} />}
                        />}
                    {this.props.data.length == 0 && <View style={styles.listStyle} />}
                    {this.props.isSelectMode && <BottomBtn deleteSet={this.props.deleteSet} />}
                </View>
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.userCollect.collectMovies,
        isSelectMode: store.userCollect.isEdit,
        deleteSet: store.userCollect.deleteSet,
    }
}

export default connect(mapState2Props)(CollectModel);

const styles = StyleSheet.create({
    listStyle: {
        flex: 1
    },
    bottomContainer: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: 'rgba(153,153,153,0.2)',
        borderTopWidth: 1,
        backgroundColor: 'rgb(51,57,62)'
    }
});