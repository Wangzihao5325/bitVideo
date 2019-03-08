import React, { PureComponent } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import ShortDetailPlayer from './ShortDetailPlayer';

//http://youku.com-www-163.com/20180506/576_bf997390/index.m3u8
export default class ShortVideoDetail extends PureComponent {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ShortDetailPlayer videoUrl={} />
            </SafeAreaView>
        );
    }
}