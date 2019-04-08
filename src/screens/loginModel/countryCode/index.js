import React, { PureComponent } from 'react';
import { SafeAreaView, SectionList, View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import store from '../../../store/index';
import { countryCodeChange } from '../../../store/actions/countryAction';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';
import * as Colors from '../../../global/Colors';
import CH_sections from '../../../global/doc/Country_code_CH';

import ModalHeader from '../../../components/modal/ModalHeader';
import IconBtn from '../../../components/imageBtn/IconBtn';

class SectionHeader extends PureComponent {
    render() {
        return (
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionText}>{this.props.title}</Text>
            </View>
        );
    }
}
class Item extends PureComponent {
    itemOnPress = () => {
        let textArr = this.props.item.split(' ');
        let countryCode = textArr[1];
        store.dispatch(countryCodeChange(countryCode));
        this.props.itemPress();
    }
    render() {
        let textArr = this.props.item.split(' ');
        return (
            <TouchableHighlight onPress={this.itemOnPress} underlayColor='transparent'>
                <View style={styles.itemContainer} >
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.itemText}>{textArr[0]}</Text>
                        <Text style={styles.itemText2}>{textArr[1]}</Text>
                    </View>
                    <View style={styles.borderView} />
                </View>
            </TouchableHighlight>
        );
    }
}
class SearchHeader extends PureComponent {
    render() {
        return (
            <View style={styles.searchHeaderContainer}>
                <View style={styles.searchContent}>
                    <IconBtn height={18} width={18} source={require('../../../image/mine/search.png')} />
                    <TextInput style={{ flex: 1, marginLeft: 8, color: 'white', fontSize: 12 }} onChangeText={this.props.search} placeholderTextColor='white' placeholder='搜索' />
                </View>
            </View>
        );
    }
}
export default class CountryCode extends PureComponent {
    state = {
        listData: CH_sections
    }
    goBack = () => {
        this.props.navigation.goBack();
    }
    search = (text) => {
        let listData = [];
        CH_sections.forEach((itemObj) => {
            let searchData = itemObj.data.filter((country) => {
                let index = country.indexOf(text);
                if (index >= 0) {
                    return true;
                } else {
                    return false
                }
            });
            if (searchData.length > 0) {
                let itemObjCopy = JSON.parse(JSON.stringify(itemObj));
                itemObjCopy.data = searchData;
                listData.push(itemObjCopy);
            }
        });
        this.setState({
            listData: listData
        });
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <ModalHeader goBack={this.goBack} textStyle={{ color: 'white' }} backBtnColor='rgb(255,255,255)' title={In18.COUNTRY_CODE} rightBtnMode='none' />
                <SearchHeader search={this.search} />
                <SectionList
                    style={{ height: Sizes.DEVICE_HEIGHT - 182, width: '100%' }}
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader title={title} />
                    )}
                    renderItem={({ item, index, section }) => <Item key={index} item={item} itemPress={this.goBack} />}
                    sections={this.state.listData}
                />
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        height: 60,
        width: '100%'
    },
    borderView: {
        height: 1,
        width: Sizes.DEVICE_WIDTH - 27 - 27,
        marginLeft: 27,
        backgroundColor: 'rgb(81,94,101)'
    },
    itemText: {
        marginLeft: 33,
        color: 'rgb(177,177,177)',
        fontSize: 14
    },
    itemText2: {
        marginRight: 34,
        color: 'rgb(177,177,177)',
        fontSize: 14
    },
    sectionContainer: {
        height: 34,
        width: '100%',
        backgroundColor: 'rgb(51,57,62)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionText: {
        fontWeight: "bold",
        marginLeft: 30,
        fontSize: 18,
        color: 'white'
    },
    searchHeaderContainer: {
        height: 34,
        width: '100%',
        marginTop: 30,
        marginBottom: 20
    },
    searchContent: {
        marginHorizontal: 15,
        flex: 1,
        borderRadius: 17,
        backgroundColor: 'rgb(51,57,62)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 17
    }
});