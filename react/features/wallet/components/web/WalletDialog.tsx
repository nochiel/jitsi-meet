// TODO(nochiel) Translatable text for all componenents.

import { getLogger } from '../../../base/logging/functions';    // NOCHECKIN
const logger = getLogger('WalletDialog.tsx');

import React, { useEffect } from 'react';
import { WithTranslation } from 'react-i18next';
import { connect } from 'react-redux';

import { sendAnalytics } from '../../../analytics/functions';
import { IReduxState } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import { JitsiRecordingConstants } from '../../../base/lib-jitsi-meet';
import { IJitsiParticipant } from '../../../base/participants/types';
import { getCurrentConference, getConferenceName } from '../../../base/conference/functions';
import { getLocalParticipant } from  '../../../base/participants/functions';

import Dialog from '../../../base/ui/components/web/Dialog';
import { StatusCode } from '../../../base/util/uri';
import { isDynamicBrandingDataLoaded } from '../../../dynamic-branding/functions.any';
import { getActiveSession } from '../../../recording/functions';

import { getPayableAddresses } from './../../functions';
import { PayableAddress } from '../../types';

import BalanceSection from './BalanceSection';
import AddressSection from './AddressSection';
import SendTip from './SendTip';


interface IProps extends WithTranslation {

    _myAddress: string,
    /**
     * participantIds and their corresponding addresses, if one exists.
     */
    _payableAddresses: PayableAddress[],    // TODO(nochiel) {participantId, payableAddress}

    /**
     * Method to update payable addresses for each participant.
     */
    // getAddresses: Function
}

/**
 * Invite More component.
 *
 * @returns {React$Element<any>}
 */
// TODO(nochiel) Cancel button should set isOpen = False
// TODO(nochiel) WallteDialog width should be so that BalanceSection does not wrap.
// DONE(nochiel) Show balance
function WalletDialog({
    _myAddress,
    _payableAddresses,      
    t,
    // getAddresses,
}: IProps) {

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

    logger.debug(`XXX: ${_payableAddresses.map(e => e.participantId)}`);

    return (
        <Dialog
            cancel = {{ hidden: true }}
            ok = {{ hidden: true }}
            titleKey = 'wallet.title'>
            <div className = 'wallet-dialog'>
                { /* 
                // TODO(nochiel) Add label with participant's address.
                */
                }
                <AddressSection address = { _myAddress } /> 
                <BalanceSection 
                    balance = { 4242 } 
                />
                <SendTip 
                    participantAddress  = '0xcafebabe'
                    payableAddresses = { _payableAddresses  // FIXME(nochiel)
                }

                />
                {
                // TODO(nochiel)
                /*
                <StreamPayments />
                */
                }
            </div>
        </Dialog>
    );
}

function StreamPayments() {}

/**
 * Maps (parts of) the Redux state to the associated props for the
 * {@code WalletDialog} component.
 * 
 *
 * @param {Object} state - The Redux state.
 * @param {Object} ownProps - The properties explicitly passed to the component.
 * @private
 * @returns {IProps}
 */
function mapStateToProps(state: IReduxState, ownProps: Partial<IProps>) {
    const currentLiveStreamingSession
        = getActiveSession(state, JitsiRecordingConstants.mode.STREAM);

    // TODO(nochiel) Update the state so we can make use of this.
    // That is, the wallet has to be valid for this conference e.g. a participant
    // might have different wallets for different conferences.
    // let { conferenceId, participantId, addresses } = state['features/wallet'];
    const conference = getCurrentConference(state);
    const participants = conference?.getParticipants();
    const conferenceId = conference?.sessionId;
    const participant = getLocalParticipant(state);       
    const participantId = participant?.id

    const addresses = participants?.map((p: IJitsiParticipant) => { 
        return {
            participantId: p.getId(),
            address: '0xcafebabe' // getPayableAddressByParticipantId(p.id)
        }
    })

    logger.debug(`XXX: conference ${conferenceId}`);
    logger.debug(`XXX: participant ${participantId}`);
    logger.debug(`XXX: ${addresses.map(e => e.participantId)}`);
    return {
        _conferenceId: conferenceId,
        _myAddress: participantId,
        _payableAddresses: addresses,
    };
}

/**
 * Maps dispatching of some action to React component props.
 *
 * @param {Function} dispatch - Redux action dispatcher.
 * @returns {IProps}
 */
// TODO(nochiel) Do we need to have this?
/*
const mapDispatchToProps = {
    getAddresses: () => getPayableAddresses()
};
*/

export default translate(
    connect(mapStateToProps)(WalletDialog)
);
