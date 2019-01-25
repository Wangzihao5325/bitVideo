import React, { PureComponent } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Sizes from '../../global/Sizes';

class AdComponent extends PureComponent {
    render() {
        let url = '';
        let title = '';
        let remark = '';
        if (this.props.data) {
            let adData = this.props.data.filter((item) => { return item.module === 'ad' });
            adData = adData[0].m_ad_data;
            url = adData[0].cover_path;
            // title = adData[0].title;
            // remark = adData[0].remark;
        }
        return (
            <Image style={styles.container} source={{ uri: url }} />
        );
    }
}
function mapState2Props(store) {
    return {
        data: store.mainPageData.data
    }
}

export default connect(mapState2Props)(AdComponent);
const styles = StyleSheet.create({
    container: {
        width: Sizes.DEVICE_WIDTH,
        height: 140,
        display: 'flex',
        marginTop: 10
    }
});