import React, {useState} from 'react';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
// import styles from '../../styles/styles';

const propTypes = {
    /** URL to video */
    url: PropTypes.string.isRequired,
};

const defaultProps = {};

const VideoPlayer = (props) => {
    const [aspectRatio, setAspectRatio] = useState(0);

    const urlWithoutAuthToken = props.url.split('?')[0];

    const onBuffer = (e) => {
        console.log(`${urlWithoutAuthToken} is buffering`, e);
    };

    const onError = (e) => {
        console.log(`${urlWithoutAuthToken} video playback error`, e);
    };

    return (
        <Video
            source={{uri: props.url}}
            controls
            onBuffer={onBuffer}
            onError={onError}
            onLoad={(response) => {
                const {width, height} = response.naturalSize;
                setAspectRatio(width / height);
            }}
            style={{width: '100%', aspectRatio}}
            resizeMode="contain"
            playInBackground={false}
            playWhenInactive={false}
            paused
        />
    );
};

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
