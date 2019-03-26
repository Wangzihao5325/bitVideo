import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class TitleHeader extends PureComponent {
    show_more = () => {
        if (this.props.showMore) {
            this.props.showMore();
        }
    }
    render() {
        return (
            <View style={[styles.titleHeaderContainer, this.props.style]}>
                <Image resizeMode='contain' style={styles.headerImage} source={this.props.imageSource} />
                <Text style={[styles.headerText, this.props.headerStyle]}>{this.props.title}</Text>
                <View style={styles.headerFlexView}>
                    {this.props.btnTitle && <Text onPress={this.show_more} style={[styles.more, this.props.moreStyle]}>{this.props.btnTitle}</Text>}
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    titleHeaderContainer: {
        height: 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    headerImage: {
        height: 18,
        width: 18,
        marginLeft: 15
    },
    headerText: {
        fontSize: 18,
        color: 'rgb(187,186,186)',
        marginLeft: 6
    },
    headerFlexView: {
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: 'center'
    },
    more: {
        marginRight: 38,
        fontSize: 14,
        color: 'rgb(187,186,186)'
    }
});