import React, { PureComponent } from 'react';
import { SafeAreaView } from 'react-native';
import * as In18 from '../../../global/In18';

import ModalHeader from '../modalComponent/ModalHeader';

export default class CountryCode extends PureComponent {
    goBack = () => {
        this.props.navigation.goBack()
    }
    render() {
        return (
            <SafeAreaView>
                <ModalHeader title={In18.COUNTRY_CODE} goBack={this.goBack} />
            </SafeAreaView>
        );
    }
}