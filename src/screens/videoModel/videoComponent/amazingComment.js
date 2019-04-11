import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';
import { FlatList } from 'react-native-gesture-handler';
class Item extends PureComponent {
    render() {
        let defaultSource = require('../../../image/usual/default_avater.png');
        if (this.props.source && this.props.source !== '') {
            defaultSource = { uri: this.props.source };
        }
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemAvaterFlexView}>
                    <Image style={styles.itemAvaterImage} defaultSource={require('../../../image/usual/default_avater.png')} source={defaultSource} />
                </View>
                <View style={styles.itemAvaterFlexView2}>
                    <Text style={[styles.itemNameText,{marginTop:3}]}>{this.props.name ? this.props.name : ''}</Text>
                    <Text style={[styles.itemNameText, { marginTop: 5, fontSize: 10 }]}>{this.props.time ? this.props.time : ''}</Text>
                    <Text ellipsizeMode='tail' numberOfLines={2} style={styles.itemContentText}>{this.props.content}</Text>
                </View>
            </View>
        );
    }
}
class CommentList extends PureComponent {
    render() {
        let height = 300;
        if (this.props.data && this.props.data.length === 1) {
            height = 100;
        } else if (this.props.data.length === 2) {
            height = 200;
        }
        return (
            <View style={[styles.commemtListContainer, { height: height }]}>
                <FlatList
                    style={{ flex: 1 }}
                    data={this.props.data}
                    renderItem={({ item }) => <Item source={item.cover_path} name={item.name} time={item.updated_at} content={item.content} />}
                />
            </View>
        );
    }
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
        let stateReg = this.props.commentList.length > 0 ? true : false;
        return (
            <View style={styles.container}>
                <View style={styles.header}><Text style={styles.headerText}>{In18.AMAZING_COMMNET}</Text></View>
                {!stateReg && <NoDataContent />}
                {stateReg && <CommentList data={this.props.commentList} />}
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
        marginTop: 10,
        zIndex: 10
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
        color: 'rgb(178,178,178)',
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
    },
    itemContainer: {
        height: 100,
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    itemAvaterFlexView: {
        width: 55,
        height: 100
    },
    itemAvaterFlexView2: {
        flex: 1
    },
    itemAvaterImage: {
        height: 40,
        width: 40,
        borderRadius: 20,
        marginLeft: 15
    },
    itemNameText: {
        fontSize: 14,
        color: 'rgb(100,100,100)',
        marginLeft: 10,
    },
    itemTimeText: {
        fontSize: 12,
        color: 'rgb(151,151,151)',
        marginLeft: 10,
        marginTop: 2
    },
    itemContentText: {
        marginLeft: 10,
        height: 34,
        width: Sizes.DEVICE_WIDTH - 65 - 19,
        fontSize: 14,
        color: 'rgb(178,178,178)',
        marginTop: 10
    },
    commemtListContainer: {
        height: 300,
        width: '100%'
    }
});