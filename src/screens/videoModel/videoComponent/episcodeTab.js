import React, { PureComponent } from 'react';
import { StyleSheet, TouchableHighlight, Text, View, FlatList } from 'react-native';

class Btn extends Component {
    state = {
        isHighLight: false
    }

    btnOnPress = () => {
        if (this.props.highlightIndex === this.props.index) {
            return;
        } else {
            if (this.props.onPress) {
                this.props.onPress(this.props.index);
            }
        }
    }
    render() {
        let textStyle = this.props.highlightIndex === this.props.index ? styles.btnHighlightText : styles.btnNormalText;
        return (
            <TouchableHighlight style={styles.btnContainer} onPress={this.btnOnPress} underlayColor='transparent'>
                <Text style={textStyle} ellipsizeMode='tail' numberOfLines={1}>{this.props.title}</Text>
            </TouchableHighlight>
        );
    }
}

export default class EpiscodeTab extends PureComponent {

    state = {
        sourceTypeHighlightIndex: 0,
        videoId: 0,
        source: [],
    }

    render() {
        return (
            <View>
                {
                    this.state.source && <FlatList
                        horizontal={true}
                        data={this.state.source}
                        renderItem={
                            ({ item, index }) => <Btn
                                key={index}
                                index={index}
                                highlightIndex={item.highlightIndex}
                                title={item.title}
                                onPress={this.itemOnPress}
                            />}
                    />
                }
            </View>
        );
    }
}

function mapState2Props(store) {
    return {
        source: store.videoDeatilInfo.videoSource,
        videoId: store.videoDeatilInfo.id,
    }
}

export default connect(mapState2Props)(EpiscodeTab);

const styles = StyleSheet.create({
    btnContainer: {
        height: 40,
        width: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(242,242,242)',
        borderRadius: 5,
        marginHorizontal: 5
    },
    btnHighlightText: {
        color: 'rgb(5,131,255)',
        fontSize: 16
    },
    btnNormalText: {
        color: 'rgb(32,32,32)',
        fontSize: 16
    },
});