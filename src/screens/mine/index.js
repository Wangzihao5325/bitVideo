import React, { PureComponent } from 'react';
import { ScrollView, View, StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import Header from './header';
import FunList from './funList';
import History from './history';
import Bottom from './bottom';

export default class MineScreen extends PureComponent {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    render() {
        return (
            <ScrollView style={{ height: 1000, width: '100%' }} showsVerticalScrollIndicator={false} alwaysBounceVertical={false}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={require('../../image/mine/mine_background.png')}
                >
                    <SafeAreaView style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <Header />
                            <FunList />
                            <History />
                            <Bottom />
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        width: '100%',
        height: 207,//780
    }
});