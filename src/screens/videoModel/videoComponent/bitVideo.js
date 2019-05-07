import BitPlayer from '../../../components/player/BitPlayer';
import { connect } from 'react-redux';

function mapState2Props(store) {
    return {
        source: store.videoPlay.videoUrl,
        fullData: store.videoDeatilInfo.fullData
    }
}

export default connect(mapState2Props)(BitPlayer);