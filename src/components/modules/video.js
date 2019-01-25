import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';

import VideoAvater from '../imageBtn/VideoAvater';

class SUDOKU extends PureComponent {
    state = {
        data: []
    }

    static getDerivedStateFromProps(props, state) {
        let showData = props.data.slice(0, props.limit);
        return {
            data: showData
        }
    }
    render() {
        return (
            <FlatList
                horizontal={false}
                numColumns={this.props.lineNum}
                data={this.state.data}
                renderItem={({ item }) => <VideoAvater isVertical={this.props.isVertical} onPress={() => this.movieAvaterOnPress(item.id)} imageSource={{ uri: `${item.cover_path}` }} title={item.title} info={item.intro} />}
                columnWrapperStyle={{ marginTop: 20 }}
            />
        );
    }
}
// class GUNDONG extends PureComponent {

// }
export default class VideoModule extends PureComponent {
    render() {
        if (this.props.clientStyle == 's_video_sudoku_3') {
            return (<SUDOKU data={this.props.data} limit={this.props.limit} lineNum={3} isVertical={true} />);
        }
        if (this.props.clientStyle == 's_video_sudoku_2') {
            return (<SUDOKU data={this.props.data} limit={this.props.limit} lineNum={2} isVertical={false} />);
        }
        if (this.props.clientStyle == 's_video_gundong_shu') {
            // return (<GUNDONG data={this.props.data} isVertical={true} />);
        }
        if (this.props.clientStyle == 's_video_gundong_heng') {
            // return (<GUNDONG data={this.props.data} isVertical={false} />);
        }
    }
}
