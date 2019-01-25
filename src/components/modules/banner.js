import React, { PureComponent } from 'react';
import { View, Image } from 'react-native';
import * as Sizes from '../../global/Sizes';

import Carousel from 'react-native-looped-carousel';

export default class BannerModule extends PureComponent {
    state = {
        size: { width: Sizes.DEVICE_WIDTH, height: 200 }
    }

    constructor(props) {
        super(props);
        this.tabs = this.itemGenerator(props.data);
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    itemGenerator = (dataArr) => {
        let items = [];
        dataArr.forEach((item, index) => {
            items.push(
                <View key={index} style={[this.state.size, { display: 'flex' }]}>
                    <Image style={{ flex: 1, borderRadius: 5 }} source={{ uri: item.cover_path }}></Image>
                </View>
            );
        });
        return items;
    }

    render() {
        return (
            <Carousel
                delay={4000}
                style={this.state.size}
                autoplay
                pageInfo
            // onAnimateNextPage={(p) => console.log(p)}
            >
                {this.tabs}
            </Carousel>
        );
    }
}