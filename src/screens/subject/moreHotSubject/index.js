import React, { PureComponent } from 'react';
import { SafeAreaView, FlatList, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import * as Colors from '../../../global/Colors';
import PropTypes from 'prop-types';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';
import SecurtyImage from '../../../components/securtyImage/index';

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
            <TouchableHighlight style={styles.itemContainer} onPress={this._press} underlayColor='transparent'>
                <View style={styles.itemFlexView}>
                    {/* <Image style={styles.image} source={{ uri: this.props.item.cover_img }} /> */}
                    <SecurtyImage style={styles.image} imageStyle={{ height: 66, width: 66, borderRadius: 33 }} source={{ uri: this.props.item.cover_img }} />
                    <Text style={styles.text}>{this.props.item.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

export default class MoreHotSubject extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        data: []
    };

    static childContextTypes = {
        subjectNavigation: PropTypes.object,
    }

    getChildContext() {
        return {
            subjectNavigation: this.props.navigation
        }
    }

    componentDidMount() {
        Api.getNewSubjectList(1, 32, (e) => {
            if (e.data && e.data.length > 0) {
                this.setState({
                    data: e.data
                });
            }

        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR, alignItems: 'center' }}>
                <ModalHeader goBack={this._goBack} textStyle={{ color: Colors.NAVI_ACTIVE_TINT_COLOR }} backBtnColor={Colors.NAVI_ACTIVE_TINT_COLOR} title='热门专题' rightBtnMode='none' />
                <FlatList
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    horizontal={false}
                    numColumns={4}
                    renderItem={({ item }) => <Item item={item} />}
                    alwaysBounceVertical={false}
                />
            </SafeAreaView>
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