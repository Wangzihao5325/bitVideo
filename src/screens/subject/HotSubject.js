import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Image, Text, FlatList, StyleSheet } from 'react-native';
import Api from '../../socket/index';
import PropTypes from 'prop-types';

import SecurtyImage from '../../components/securtyImage/index';

class Item extends PureComponent {
    static contextTypes = {
        subjectNavigation: PropTypes.object
    }

    _press = () => {
        const { subjectNavigation } = this.context;
        subjectNavigation.navigate('HotSubjectDetailScreen', { title: this.props.item.title, moduleId: this.props.item.id });
    }
    render() {
        return (
            <TouchableHighlight style={styles.itemContainer} onPress={this._press}>
                <View style={styles.itemFlexView}>
                    {/* <Image style={styles.image} source={{ uri: this.props.item.cover_img }} /> */}
                    <SecurtyImage style={styles.image} imageStyle={{ height: 66, width: 66, borderRadius: 33 }} source={{ uri: this.props.item.cover_img }} />
                    <Text style={styles.text}>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class HotSubject extends PureComponent {
    state = {
        data: []
    };

    componentDidMount() {
        Api.getNewSubjectList(1, 8, (e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    data: e.data
                });
            }

        });
    }

    render() {
        return (
            <View style={{ width: '100%', height: 206 }}>
                <FlatList
                    data={this.state.data}
                    horizontal={false}
                    numColumns={4}
                    renderItem={({ item }) => <Item item={item} />}
                    alwaysBounceVertical={false}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 66 + 7 + 20 + 10,
        width: 66 + 26,
        display: 'flex'
    },
    itemFlexView: {
        flex: 1
    },
    image: {
        height: 66,
        width: 66,
        borderRadius: 33,
        marginTop: 5,
        marginLeft: 13
    },
    text: {
        marginTop: 7,
        alignSelf: 'center',
        fontSize: 14,
        color: 'rgb(178,178,178)'
    }
});