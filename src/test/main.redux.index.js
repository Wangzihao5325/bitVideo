import React, { PureComponent } from 'react';
import { View, TouchableHighlight, StyleSheet, Text, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import store from '../../store/index';
import { test_add, test_min } from '../../store/actions/testAction';
class MainScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    add = () => {
        store.dispatch(test_add());
    }
    min = () => {
        store.dispatch(test_min());
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TouchableHighlight onPress={this.add}><Text>+</Text></TouchableHighlight>
                    <TouchableHighlight onPress={this.min}><Text>-</Text></TouchableHighlight>
                    <Text>{this.props.num}</Text>
                </View>
            </SafeAreaView>
        );
    }
}

function mapState2Props(store) {
    return {
        num: store.test.num
    }
}
export default connect(mapState2Props)(MainScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    bgVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    }
});