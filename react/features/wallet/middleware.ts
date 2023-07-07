import { AnyAction } from 'redux';

import { IStore } from '../app/types';
import { getCurrentConference } from '../base/conference/functions';
import { JitsiConferenceEvents } from '../base/lib-jitsi-meet';
import { participantJoined, participantLeft, pinParticipant } from '../base/participants/actions';
import { FakeParticipant } from '../base/participants/types';
import MiddlewareRegistry from '../base/redux/MiddlewareRegistry';
import StateListenerRegistry from '../base/redux/StateListenerRegistry';
import { getCurrentRoomId } from '../breakout-rooms/functions';
import { addStageParticipant } from '../filmstrip/actions.web';
import { isStageFilmstripAvailable } from '../filmstrip/functions.web';

import { RESET_WALLET, SET_WALLET_OPEN } from './actionTypes';
import { resetWallet, setWalletOpen, setupWallet, } from './actions';
import { WALLET_ID, WALLET_PARTICIPANT_NAME } from './constants';
import { getCollabDetails, getWalletServerUrl, isWalletPresent } from './functions';

// TODO(nochiel)
const focusWallet = (store: IStore) => {}

MiddlewareRegistry.register((store: IStore) => (next: Function) => async (action: AnyAction) => {

    const { dispatch, getState } = store;
    const state = getState();
    const conference = getCurrentConference(state);
    const participantId = -1;       // TODO(nochiel) 

    switch (action.type) {
        case BEGIN_WALLET_OPEN: {

            const roomId = getCurrentRoomId(state);
            if (state.roomId != roomId) {
                dispatch(setupWallet(roomId, participantId))
                conference?.getMetadataHandler().setMetadata(WALLET_ID, {
                     roomId, 
                     participantId 
                    });      // TODO(nochiel)
            }

            // TODO(nochiel) Handle initialisation of the wallet if this is the first time opened.
            dispatch(openDialog(WalletDialog));

        break;
        }
        case RESET_WALLET: {
                conference?.getMetadataHandler().setMetadata(WALLET_ID, {
                     roomId: "-1", 
                     participantId: -1,
                     isOpen: false,
                    });      // TODO(nochiel)
            // raiseWalletNotification(WalletStatus.RESET)

            break;
        }
    }

    return next(action);
});

function raiseWalletNotification(status: WalletStatus) {

    if (typeof APP != 'undefined') {
        // APP.API.notifyWalletStatusChanged(status);  // TODO(nochiel)
    }

}

/**
 * Set up state change listener to perform maintenance tasks when the conference
 * is left or failed, e.g. Disable the wallet if it's left open.
 */
StateListenerRegistry.register(
    state => getCurrentConference(state),
    (conference, { dispatch }, previousConference): void => {
        if (conference !== previousConference) {
            dispatch(resetWallet());
        }
        if (conference && !previousConference) {
            conference.on(JitsiConferenceEvents.METADATA_UPDATED, (metadata: any) => {
                if (metadata[WALLET_ID]) {
                    dispatch(setupWallet(metadata[WALLET_ID].roomId, metadata[WALLET_ID].participantId));
                    dispatch(beginWalletOpen(true));
                }
            });
        }
    });
