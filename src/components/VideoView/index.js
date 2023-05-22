import React, {PureComponent, createElement} from 'react';
import PropTypes from 'prop-types';
import {Pressable, Text, View} from 'react-native';
import styles from '../../styles/styles';
import withWindowDimensions, {windowDimensionsPropTypes} from '../withWindowDimensions';

const propTypes = {
    /** Whether source url requires authentication */
    isAuthTokenRequired: PropTypes.bool,

    /** URL to video */
    url: PropTypes.string.isRequired,
    ...windowDimensionsPropTypes,
};

const defaultProps = {
    isAuthTokenRequired: false,
};

class VideoView extends PureComponent {
    constructor(props) {
        super(props);
        this.player = React.createRef(null);
        this.onBuffer = this.onBuffer.bind(this);
        this.onError = this.onError.bind(this);
    }

    onBuffer() {
        console.log('buffered!');
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
                    <Text style={{color: 'white'}}>is not touch screen</Text>
                    {createElement('video', {
                        src: this.props.url,
                        onError: (e) => {
                            console.log('error during video playback', e);
                        },
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
export default withWindowDimensions(VideoView);
