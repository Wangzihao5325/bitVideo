import React, { PureComponent } from 'react';
import { View, Image, TouchableHighlight, Linking } from 'react-native';
import * as Sizes from '../../global/Sizes';
import { naviToVideoService } from '../../screens/videoModel/VideoService';

import SecurtyImage from '../../components/securtyImage/index';
import Carousel from 'react-native-looped-carousel';

export default class BannerModule extends PureComponent {
    state = {
        size: { width: Sizes.DEVICE_WIDTH, height: 200 }
    }

    constructor(props) {
        super(props);
        // this.tabs = this.itemGenerator(props.data);
    }

    _onLayoutDidChange = (e) => {
        const layout = e.nativeEvent.layout;
        this.setState({ size: { width: layout.width, height: layout.height } });
    }

    _bannerPress = (id, type, link) => {
        if (this.props.navi) {
            if (type === 'VIDEO') {
                this.props.navi.navigate('VideoModel', { videoId: id });
            }
            if (type === 'LINK' && link) {
                Linking.openURL(link);
            }
            if (type === 'LINK_VIDEO') {
                this.props.navi.navigate('VideoModel', { videoId: id, type: 'ad' });
            }
        }
        //naviToVideoService(id);
    }

    itemGenerator = (dataArr) => {
        let items = [];
        dataArr.forEach((item, index) => {
            items.push(
                <View key={index} style={[this.state.size, { display: 'flex' }]}>
                    <TouchableHighlight style={{ flex: 1 }} onPress={() => this._bannerPress(item.id, item.type, item.redirect_url)}>
                        {/* <Image style={{ flex: 1, borderRadius: 5 }} defaultSource={require('../../image/usual/banner_load_failed.png')} source={{ uri: item.cover_path }}></Image> */}
                        <SecurtyImage default={require('../../image/usual/banner_load_failed.png')} style={{ height: 200, width: '100%', borderRadius: 5 }} source={{ uri: item.cover_path }} />
                    </TouchableHighlight>
                </View>
            );
        });
        return items;
    }

    render() {
        console.log(this.props.data);
        let tabs = this.itemGenerator(this.props.data);
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