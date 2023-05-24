import React, {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';
import {Pressable, Text, View} from 'react-native';
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
        console.log('did render web video view', this.props.url);
        return (
            <View
                ref={(el) => (this.scrollableRef = el)}
                onLayout={this.onContainerLayoutChanged}
                style={[styles.imageViewContainer, styles.overflowAuto, styles.pRelative]}
            >
                <Pressable
                    style={{
                        ...styles.flex1,
                    }}
                    onPressIn={this.onContainerPressIn}
                    onPress={this.onContainerPress}
                >
                    {createElement('video', {
                        src: this.props.url,
                        onError: this.onError,
                        controls: true,
                        autoPlay: true,
                    })}
                </Pressable>
            </View>
        );
    }
}

VideoView.propTypes = propTypes;
VideoView.defaultProps = defaultProps;
export default VideoView;
