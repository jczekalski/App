import React, {PureComponent} from 'react';
import Video from 'react-native-video';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import styles from '../../styles/styles';

const propTypes = {
    /** URL to video */
    url: PropTypes.string.isRequired,
};

const defaultProps = {};

class VideoView extends PureComponent {
    constructor(props) {
        super(props);
        this.player = React.createRef(null);
        this.onBuffer = this.onBuffer.bind(this);
        this.onError = this.onError.bind(this);
    }

    onBuffer(e) {
        console.log('buffering', e);
    }

    onError(e) {
        console.log('video playback error', e);
    }

    render() {
        console.log('did render native video view', this.props.url);
        return (
            <View style={[styles.imageViewContainer, styles.overflowHidden]}>
                <Video
                    source={{uri: this.props.url}} // Can be a URL or a local file.
                    ref={(ref) => {
                        this.player = ref;
                    }} // Store reference
                    onBuffer={this.onBuffer} // Callback when remote video is buffering
                    onError={this.onError} // Callback when video cannot be loaded
                    style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
                />
            </View>
        );
    }
}

VideoView.propTypes = propTypes;
VideoView.defaultProps = defaultProps;
export default VideoView;
