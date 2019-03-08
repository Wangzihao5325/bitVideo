import RootPlayer from '../../../components/player/RootPlayer';
import { connect } from 'react-redux';

function mapState2Props(store) {
    return {
        videoType: store.videoPlay.videoType,
        videoUrl: store.videoPlay.videoUrl,
    }
}

export default connect(mapState2Props)(RootPlayer);