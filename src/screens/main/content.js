import React, { PureComponent } from 'react';
import { ScrollView, View, Text, FlatList, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';

import AdModule from '../../components/modules/ad';
import BannerModule from '../../components/modules/banner';
import VideoModule from '../../components/modules/video';

class Item extends PureComponent {
    render() {
        switch (this.props.item.client_module) {
            case 'm_banner':
                // if (item.m_banner_data.length > 0) {//有可能会出现 arr.length=0 的情况
                //     return (<BannerModule key={index} data={item.m_banner_data} />);
                // }
                return (<BannerModule key={this.props.index} data={this.props.item.m_banner_data} />);
            case 'm_video':
                return (<VideoModule title={this.props.item.title} key={this.props.index} limit={this.props.item.client_limit} clientStyle={this.props.item.client_style} data={this.props.item.m_video_data} />);
            case 'm_ad':
                return (<AdModule key={this.props.index} data={this.props.item.m_ad_data[0]} />);
            default:
                return (<View style={{ flex: 1 }} />);
        }
    }
}

class Content extends PureComponent {
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.data}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
            />
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