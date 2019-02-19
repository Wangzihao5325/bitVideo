import React, { PureComponent } from 'react';
import { SafeAreaView, View } from 'react-native';
import Api from '../../../socket/index';

import ModalHeader from '../../../components/modal/ModalHeader';

export default class ViewModuleMoreScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title', ''),
        };
    };

    componentDidMount() {
        const moduleId = this.props.navigation.getParam('moduleId', 'undefine_Id');
        Api.getViewModuleMore(moduleId, 1, 10, (e) => {
            if (e) {
                console.log('ffffff');
                console.log(e);
            }
        })
    }

    _goBack = () => {
        this.props.navigation.pop();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
            </SafeAreaView>
        );
    }
}