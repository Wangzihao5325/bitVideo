import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Image, Text, FlatList, StyleSheet } from 'react-native';
import Api from '../../socket/index';

class Item extends PureComponent {
    render() {
        return (
            <TouchableHighlight style={styles.itemContainer}>
                <View style={styles.itemFlexView}>
                    <Image style={styles.image} source={{ uri: this.props.item.type_cover_path }} />
                    <Text style={styles.text}>{this.props.item.type_name}</Text>
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
        Api.getVideoTypeList((e) => {
            console.log('112233445');
            console.log(e);
            if (e.film) {
                let data = e.film;
                if (data.length > 8) {
                    data = data.slice(0, 8);
                }
                this.setState({ data: data });
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
        color: 'rgb(54,54,54)'
    }
});