import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import * as Colors from '../../../global/Colors';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';



export default class DetailTypeScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null,
            headerBackTitle: null
        }
    };

    state = {
        type: '',
        title: '',
        typeData: null,
        videoData: null
    }

    componentDidMount() {
        const type = this.props.navigation.getParam('type', '');
        const title = this.props.navigation.getParam('title', '');
        this.setState({
            title: title,
            type: type
        });
        Api.getTypeArrsByGlobalType(type, (e) => {
            console.log('1122334');
            console.log(e);
        });
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    _search = () => {
        this.props.navigation.navigate('SearchModel');
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.SCREEN_BGCOLOR }}>
                <View style={{ flex: 1 }}>
                    <ModalHeader
                        goBack={this._goBack}
                        title={this.state.title}
                        rightBtnMode='icon'
                        rightBtnOnPress={this._search}
                        iconSource={require('../../../image/usual/search.png')} />
                </View>
            </SafeAreaView>
        );
    }
}