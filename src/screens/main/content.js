import React, { PureComponent } from 'react';
import { ScrollView, View, Text, FlatList, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';
import * as In18 from '../../global/In18';


// import TitleHeader from '../../components/titleHeader/index';
// import MovieAvater from '../../components/imageBtn/MovieAvater';
import AdModule from '../../components/modules/ad';
import BannerModule from '../../components/modules/banner';
import VideoModule from '../../components/modules/video';

// class VideoContainer extends PureComponent {
//     static contextTypes = {
//         mainNavigation: PropTypes.object
//     }

//     state = {
//         data: []
//     };

//     static getDerivedStateFromProps(props, state) {
//         let videoData = props.data.filter((item) => { return item.module === 'recommend_hot' });
//         videoData = videoData[0].m_video_data;

//         return {
//             data: videoData
//         }
//     }

//     movieAvaterOnPress = (id) => {
//         const { mainNavigation } = this.context;
//         mainNavigation.navigate('VideoModel', { videoId: id });
//     }

//     render() {

//         return (
//             <View>
//                 <FlatList
//                     horizontal={false}
//                     numColumns={3}
//                     data={this.state.data}
//                     renderItem={({ item }) => <MovieAvater onPress={() => this.movieAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} intro={item.intro} />}
//                     columnWrapperStyle={{ marginTop: 20 }}
//                 />
//             </View>
//         );
//     }
// }
class Content extends PureComponent {
    render() {
        console.log(this.props.data);
        console.log('cccccccccccccc');
        let modules = [];
        if (this.props.data && this.props.data.length > 0) {
            this.props.data.forEach((item, index) => {
                switch (item.client_module) {
                    case 'm_banner':
                        modules.push(<BannerModule key={index} data={item.m_banner_data} />);
                        break;
                    case 'm_video':
                        modules.push(<VideoModule key={index} limit={item.client_limit} clientStyle={item.client_style} data={item.m_video_data} />);
                        break;
                    case 'm_ad':
                        modules.push(<AdModule key={index} data={item.m_ad_data[0]} />);
                        break;
                }
            })
        }
        return (
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ display: 'flex', alignItems: 'center' }}>
                {modules}
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