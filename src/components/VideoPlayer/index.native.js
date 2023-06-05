import React, {useState} from 'react';
import {View} from 'react-native';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import styles from '../../styles/styles';
import FullscreenLoadingIndicator from '../FullscreenLoadingIndicator';

const propTypes = {
    /** URL to video */
    url: PropTypes.string.isRequired,
};

const defaultProps = {};

const VideoPlayer = (props) => {
    const [aspectRatio, setAspectRatio] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const urlWithoutAuthToken = props.url.split('?')[0];

    const onBuffer = (e) => {
        console.log(`${urlWithoutAuthToken} is buffering`, e);
    };

    const onError = (e) => {
        console.log(`${urlWithoutAuthToken} video playback error`, e);
    };

    const onLoad = (data) => {
        const {width, height} = data.naturalSize;

        setAspectRatio(width / height);
        setIsLoading(false);
    };

    return (
        <View>
            <Video
                source={{uri: props.url}}
                controls
                onBuffer={onBuffer}
                onError={onError}
                onLoad={onLoad}
                style={{width: '100%', aspectRatio}}
                resizeMode="contain"
                playInBackground={false}
                playWhenInactive={false}
                paused
            />
            {isLoading && <FullscreenLoadingIndicator style={[styles.opacity1, styles.bgTransparent]} />}
        </View>
    );
};

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
