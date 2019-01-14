import React, { PureComponent } from 'react';
import { SafeAreaView, SectionList, View, Text, StyleSheet } from 'react-native';
import * as In18 from '../../../global/In18';
import * as Sizes from '../../../global/Sizes';

import ModalHeader from '../modalComponent/ModalHeader';
import CH_sections from '../../../global/doc/Country_code_CH';
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
    render() {
        let textArr = this.props.item.split(' ');
        return (
            <View style={styles.itemContainer}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.itemText}>{textArr[0]}</Text>
                    <Text style={styles.itemText2}>{textArr[1]}</Text>
                </View>
                <View style={styles.borderView} />
            </View>
        );
    }
}
export default class CountryCode extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title={In18.COUNTRY_CODE} goBack={this.goBack} />
                <SectionList
                    renderSectionHeader={({ section: { title } }) => (
                        <SectionHeader title={title} />
                    )}
                    renderItem={({ item, index, section }) => <Item key={index} item={item} />}
                    sections={CH_sections}
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
        backgroundColor: 'rgb(238,238,238)'
    },
    itemText: {
        marginLeft: 33,
        color: 'rgb(54,54,54)',
        fontSize: 14
    },
    itemText2: {
        marginRight: 34,
        color: 'rgb(54,54,54)',
        fontSize: 14
    },
    sectionContainer: {
        height: 34,
        width: '100%',
        backgroundColor: 'rgb(239,244,247)',
        flexDirection: 'row',
        alignItems: 'center'
    },
    sectionText: {
        fontWeight: "bold",
        marginLeft: 30,
        fontSize: 18,
        color: 'rgb(100,100,100)'
    }
});