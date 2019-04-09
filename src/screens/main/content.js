import React, { PureComponent } from 'react';
import { ScrollView, View, Text, FlatList, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { setMainPageData, setPageInfo, addMainPageData } from '../../store/actions/mainPageDataAction';
import store from '../../store/index';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';
import Api from '../../socket/index';

import AdModule from '../../components/modules/ad';
import BannerModule from '../../components/modules/banner';
import VideoModule from '../../components/modules/video';
import GlobalTypeModule from '../../components/modules/globalType';

class Item extends PureComponent {

    static contextTypes = {
        mainNavigation: PropTypes.object
    }

    render() {
        const { mainNavigation } = this.context;
        switch (this.props.item.client_module) {//m_global_type
            case 'm_banner':
                if (this.props.item.m_banner_data && this.props.item.m_banner_data.length > 0) {//有可能会出现 arr.length=0 的情况
                    return (<BannerModule key={this.props.index} data={this.props.item.m_banner_data} navi={mainNavigation} />);
                }
            case 'm_video_type':
                if (this.props.item.m_video_type_data && this.props.item.m_video_type_data.length > 0) {
                    return (<GlobalTypeModule key={this.props.index} data={this.props.item.m_video_type_data} navi={mainNavigation} />);
                }
            case 'm_video':
                if (this.props.item.m_video_data && this.props.item.m_video_data.length > 0) {
                    return (<VideoModule moduleId={this.props.item.id} title={this.props.item.title} key={this.props.index} limit={this.props.item.client_limit} clientStyle={this.props.item.client_style} data={this.props.item.m_video_data} navi={mainNavigation} />);
                }
            case 'm_ad':
                if (this.props.item.m_ad_data && this.props.item.m_ad_data.length > 0) {
                    return (<AdModule key={this.props.index} data={this.props.item.m_ad_data[0]} navi={mainNavigation} />);
                }
            default:
                return (<View style={{ height: 1, width: Sizes.DEVICE_WIDTH, backgroundColor: 'transparent' }} />);
        }
    }
}

class Content extends PureComponent {
    _flatListRefresh = () => {
        Api.postGlobalTypeVideo('recommend', null, (e) => {
            if (e.data) {
                store.dispatch(setMainPageData(e.data));
                store.dispatch(setPageInfo(e.current_page, e.last_page));
            }
        });
    }
    _getNextPageData = () => {
        if (this.props.nowPage >= this.props.totalPage) {
            return;
        }
        Api.postGlobalTypeVideo('recommend', this.props.nowPage + 1, (e, code, message) => {
            if (e.data) {
                store.dispatch(addMainPageData(e.data));
                store.dispatch(setPageInfo(e.current_page, e.last_page));
            }
        });
    }
    render() {
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                data={this.props.data}
                renderItem={({ item, index }) => <Item item={item} index={index} />}
                onRefresh={this._flatListRefresh}
                refreshing={false}
                onEndReached={this._getNextPageData}
                onEndReachedThreshold={0.1}
            />
        );
    }
}

function mapState2Props(store) {
    return {
        data: store.mainPageData.data,
        totalPage: store.mainPageData.totalPage,
        nowPage: store.mainPageData.nowPage
    }
}

export default connect(mapState2Props)(Content);

const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH
    }
});