import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Api from '../../socket/index';

class Item extends PureComponent {

}

export default class HotSubject extends PureComponent {
    state = {
        data: []
    };

    componentDidMount() {
        Api.getVideoTypeList((e) => {
            console.log(e);
            if (e.film) {
                let data = e.film;
                if (data.length > 8) {
                    data = data.slice(0, 8);
                }
                this.setState({ data: data });
            }
        });
    }

    render() {
        return (
            <View />
        );
    }
}