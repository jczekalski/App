import {createElement} from 'react';
import PropTypes from 'prop-types';
// import styles from '../../styles/styles';

const propTypes = {
    /** URL to video */
    url: PropTypes.string.isRequired,
};

const defaultProps = {};

const VideoPlayer = (props) =>
    createElement('video', {
        src: props.url,
        controls: true,
        style: {height: '100%', width: '100%'},
    });

VideoPlayer.propTypes = propTypes;
VideoPlayer.defaultProps = defaultProps;
VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
