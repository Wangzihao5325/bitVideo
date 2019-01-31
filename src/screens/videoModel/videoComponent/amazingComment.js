import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import * as In18 from '../../../global/In18';
class Item extends PureComponent {
    render() {

    }
}
class CommentList extends PureComponent {

}
class NoDataContent extends PureComponent {
    render() {
        return (
            <View style={styles.noDataContainer}>
                <Text style={styles.noDataText}>{In18.NO_COMMNET_TEXT}</Text>
            </View>
        );
    }
}
class AmazingComment extends PureComponent {
    render() {
        console.log('_____this is reducer data_____!!!!!');
        console.log(this.props.commentList);
        let stateReg = this.props.commentList.length > 0 ? true : false;
        return (
            <View style={styles.container}>
                <View style={styles.header}><Text style={styles.headerText}>{In18.AMAZING_COMMNET}</Text></View>
                {!stateReg && <NoDataContent />}
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        commentList: store.videoDeatilInfo.commentList,
    }
}

export default connect(mapState2Props)(AmazingComment);

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    header: {
        height: 40,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        marginLeft: 10,
        color: 'rgb(54,54,54)',
        fontSize: 16,
        fontWeight: 'bold'
    },
    noDataContainer: {
        height: 80,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    noDataText: {
        color: 'rgb(153,153,153)',
        fontSize: 14
    }
});