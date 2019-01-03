import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import * as PixelUtil from '../../global/utils/PixelUtil';
import * as Colors from '../../global/Colors';

import TabBar from '../../components/tabBar/index';

export default class MainScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    render() {

        let WV_Width = PixelUtil.webviewSizeUnifyFromDPToPX(200);
        let WV_Height = PixelUtil.webviewSizeUnifyFromDPToPX(150);
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <TabBar tabNames={['推荐', '搞笑', '电视剧', '动漫', '综艺']} tabTap={(classfiy) => { console.log(classfiy) }} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.SAFE_AREA_BGCOLOR
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerContainer: {
        display: 'flex',
        height: 75,
        backgroundColor: Colors.SAFE_AREA_BGCOLOR
    }
});