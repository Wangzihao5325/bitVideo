import React, { PureComponent } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BG_COLOR = 'rgb(74,63,58)';
export default class SearchBar extends PureComponent {
    search = () => {
        console.log('startSearch');
    }
    render() {
        let remommendText = this.props.recommendText ? this.props.recommendText : '';
        return (
            <View style={styles.container}>
                <Icon.Button
                    name="search"
                    size={20}
                    color='rgb(250,214,72)'
                    backgroundColor={BG_COLOR}
                    onPress={this.search}
                />
                <TextInput
                    style={styles.textInput}
                    textAlignVertical='center'
                    placeholder={remommendText}
                    placeholderTextColor='#909090' />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 36,
        marginHorizontal: 10,
        borderRadius: 6,
        backgroundColor: BG_COLOR,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: BG_COLOR,
        flex: 1,
        color: 'white',
    }
});