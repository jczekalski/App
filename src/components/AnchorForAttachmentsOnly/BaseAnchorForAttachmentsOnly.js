import React from 'react';
import {Pressable, View} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import Str from 'expensify-common/lib/str';
import PropTypes from 'prop-types';
import {propTypes as anchorForAttachmentsOnlyPropTypes, defaultProps as anchorForAttachmentsOnlyDefaultProps} from './anchorForAttachmentsOnlyPropTypes';
import CONST from '../../CONST';
import ONYXKEYS from '../../ONYXKEYS';
import AttachmentView from '../AttachmentView';
import * as Download from '../../libs/actions/Download';
import fileDownload from '../../libs/fileDownload';
import addEncryptedAuthTokenToURL from '../../libs/addEncryptedAuthTokenToURL';
import {ShowContextMenuContext, showContextMenuForReport} from '../ShowContextMenuContext';
import * as ReportUtils from '../../libs/ReportUtils';
import AttachmentModal from '../AttachmentModal';
import * as Expensicons from '../Icon/Expensicons';
import Icon from '../Icon';

const videoContainerWidth = 250;

const propTypes = {
    /** Press in handler for the link */
    onPressIn: PropTypes.func,

    /** Press out handler for the link */
    onPressOut: PropTypes.func,

    /** If a file download is happening */
    download: PropTypes.shape({
        isDownloading: PropTypes.bool.isRequired,
    }),

    ...anchorForAttachmentsOnlyPropTypes,
};

const defaultProps = {
    onPressIn: undefined,
    onPressOut: undefined,
    download: {isDownloading: false},
    ...anchorForAttachmentsOnlyDefaultProps,
};

const BaseAnchorForAttachmentsOnly = (props) => {
    const sourceURL = props.source;
    const sourceURLWithAuth = addEncryptedAuthTokenToURL(sourceURL);
    const sourceID = (sourceURL.match(CONST.REGEX.ATTACHMENT_ID) || [])[1];
    const fileName = props.displayName;

    const isDownloading = props.download && props.download.isDownloading;

    return (
        <ShowContextMenuContext.Consumer>
            {({anchor, report, action, checkIfContextMenuActive}) =>
                Str.isVideo(sourceURL) ? (
                    <AttachmentModal
                        allowDownload
                        reportID={null}
                        source={sourceURLWithAuth}
                        isAuthTokenRequired={props.isAuthTokenRequired}
                        originalFileName={props.displayName}
                    >
                        {({show}) => (
                            <Pressable
                                style={props.style}
                                onLongPress={(event) => showContextMenuForReport(event, anchor, report.reportID, action, checkIfContextMenuActive, ReportUtils.isArchivedRoom(report))}
                            >
                                <View style={{width: videoContainerWidth}}>
                                    <AttachmentView
                                        source={sourceURLWithAuth}
                                        file={{name: fileName}}
                                    />
                                    <Pressable
                                        onPress={show}
                                        style={{position: 'absolute', top: 10, right: 10}}
                                    >
                                        <Icon src={Expensicons.Expand} />
                                    </Pressable>
                                </View>
                            </Pressable>
                        )}
                    </AttachmentModal>
                ) : (
                    <Pressable
                        style={props.style}
                        onPress={() => {
                            if (isDownloading) {
                                return;
                            }
                            Download.setDownload(sourceID, true);
                            fileDownload(sourceURLWithAuth, fileName).then(() => Download.setDownload(sourceID, false));
                        }}
                        onPressIn={props.onPressIn}
                        onPressOut={props.onPressOut}
                        onLongPress={(event) => showContextMenuForReport(event, anchor, report.reportID, action, checkIfContextMenuActive, ReportUtils.isArchivedRoom(report))}
                    >
                        <AttachmentView
                            source={sourceURLWithAuth}
                            file={{name: fileName}}
                            shouldShowDownloadIcon
                            shouldShowLoadingSpinnerIcon={isDownloading}
                        />
                    </Pressable>
                )
            }
        </ShowContextMenuContext.Consumer>
    );
};

BaseAnchorForAttachmentsOnly.displayName = 'BaseAnchorForAttachmentsOnly';
BaseAnchorForAttachmentsOnly.propTypes = propTypes;
BaseAnchorForAttachmentsOnly.defaultProps = defaultProps;

export default withOnyx({
    download: {
        key: ({source}) => {
            const sourceID = (source.match(CONST.REGEX.ATTACHMENT_ID) || [])[1];
            return `${ONYXKEYS.COLLECTION.DOWNLOAD}${sourceID}`;
        },
    },
})(BaseAnchorForAttachmentsOnly);
