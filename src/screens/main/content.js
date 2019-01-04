import React, { PureComponent } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import * as Sizes from '../../global/Sizes';

import Carousel from 'react-native-looped-carousel';

class CarouselContainer extends PureComponent {
    state = {
        size: { width: Sizes.DEVICE_WIDTH, height: 200 }
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    render() {
        return (
            <Carousel
                delay={4000}
                style={this.state.size}
                autoplay
                pageInfo
                onAnimateNextPage={(p) => console.log(p)}
            >
                <View style={[{ backgroundColor: '#BADA55' }, this.state.size]}><Text>1</Text></View>
                <View style={[{ backgroundColor: 'red' }, this.state.size]}><Text>2</Text></View>
                <View style={[{ backgroundColor: 'blue' }, this.state.size]}><Text>3</Text></View>
            </Carousel>
        );
    }
}
export default class Content extends PureComponent {
    render() {
        return (
            <ScrollView>
                <CarouselContainer />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH
    }
});