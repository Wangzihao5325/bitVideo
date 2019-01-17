import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Api from '../../socket/index';

import MovieAvater from '../../components/imageBtn/MovieAvater';

export default class TopRecommendVideos extends PureComponent {
    state = {
        data: []
    };
    componentDidMount() {
        Api.getTopRecommendVideo((e) => {
            console.log(e);
            if (e.data) {
                let data = e.data;
                if (data.length > 9) {
                    data = data.slice(0, 9);
                }
                this.setState({ data: data });
            }
        });
    }
    render() {
        return (
            <View>
                <MovieAvater />
            </View>
        );
    }
}