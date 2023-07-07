import React, { useEffect } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { sendAnalytics } from '../../../analytics/functions';
import { IReduxState } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import { JitsiRecordingConstants } from '../../../base/lib-jitsi-meet';
import Dialog from '../../../base/ui/components/web/Dialog';
import { StatusCode } from '../../../base/util/uri';
import { isDynamicBrandingDataLoaded } from '../../../dynamic-branding/functions.any';
import { getActiveSession } from '../../../recording/functions';

import { _getPayableAddresses } from './../../functions';

import BalanceSection from './BalanceSection';

interface IProps extends WithTranslation {
    payableAddresses: string[],
    getPayableAddresses: Function
}

/**
 * Invite More component.
 *
 * @returns {React$Element<any>}
 */
// TODO(nochiel) Cacnel button should set isOpen = False
// TODO(nochiel) Show balance


function WalletDialog({
    payableAddresses,
    getPayableAddresses,
}: IProps) {

    /**
     * Updates the dial-in numbers.
     */
    /*
    useEffect(() => {
            updatePayableAddresses();
    }, []);
    */

    /**
     * Sends analytics events when the dialog opens/closes.
     *
     * @returns {void}
     */
    /*
    useEffect(() => {
        sendAnalytics(createInviteDialogEvent(
            'opened', 'dialog'));

        return () => {
            sendAnalytics(createInviteDialogEvent(
                'closed', 'dialog'));
        };
    }, []);
    */

    // TODO(nochiel)
    return (
        <Dialog
            cancel = {{ hidden: true }}
            ok = {{ hidden: true }}
            titleKey = 'wallet.title'>
            <div className = 'wallet-dialog'>
                <BalanceSection 
                    balance= { 4242 } 
                    />
                {
                // TODO(nochiel)
                /*
                <Separator />
                <SendTip />
                <StreamPayments />
                */
                }
            </div>
        </Dialog>
    );
}

function SendTip() {}

function StreamPayments() {}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code WalletDialog} component.
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component.
 * @private
 * @returns {IProps}
 */
function mapStateToProps(state: IReduxState, ownProps: Partial<IProps>) {
    const currentLiveStreamingSession
        = getActiveSession(state, JitsiRecordingConstants.mode.STREAM);
    const roomId = -1; // TODO(nochiel)
    const payableAddresses = _getPayableAddresses(roomId)

    return {
        _payableAddresses: payableAddresses
    };
}

/**
 * Maps dispatching of some action to React component props.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {IProps}
 */
const mapDispatchToProps = {
    updateAddresses: () => updatePayableAddresses()
};

export default translate(
    connect(mapStateToProps, mapDispatchToProps)(WalletDialog)
);
