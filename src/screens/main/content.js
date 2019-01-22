import React, { PureComponent } from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';

import Carousel from 'react-native-looped-carousel';
import TitleHeader from '../../components/titleHeader/index';

class CarouselContainer extends PureComponent {
    state = {
        size: { width: Sizes.DEVICE_WIDTH, height: 200 }
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
                    <Image style={{ flex: 1 }} source={{ uri: item.cover_path }}></Image>
                </View>
            );
        });
        return items;
    }

    render() {
        let bannerData = this.props.data.filter((item) => { return item.module === 'banner' });
        bannerData = bannerData[0].m_banner_data;
        let tabs = this.itemGenerator(bannerData);
        return (
            <Carousel
                delay={4000}
                style={this.state.size}
                autoplay
                pageInfo
            // onAnimateNextPage={(p) => console.log(p)}
            >
                {tabs}
            </Carousel>
        );
    }
}
class Content extends PureComponent {
    render() {
        return (
            <ScrollView>
                {this.props.data && <CarouselContainer data={this.props.data} />}
                <TitleHeader
                    imageSource={require('../../image/main/global_movie.png')}
                    title={In18.GLOBAL_MOVIE}
                    btnTitle={In18.MORE_TEXT}
                    showMore={() => { console.log('11223344') }} />
            </ScrollView>
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.mainPageData.data
    }
}

export default connect(mapState2Props)(Content);

const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH
    }
});