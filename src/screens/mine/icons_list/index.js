import React, { PureComponent } from 'react';
import { SafeAreaView, Text } from 'react-native';
import * as In18 from '../../../global/In18';
import Api from '../../../socket/index';

export default class IconsListScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            title: In18.ICON_LIST_TITLE,  //header标题
            headerStyle: {
                borderBottomColor: 'white',
            },
        }
    };

    componentDidMount() {
        Api.getIconHistoryList((e) => {
            if (e) {
                console.log('gggggg');
                console.log(e);
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Text>121</Text>
            </SafeAreaView>
        );
    }
}