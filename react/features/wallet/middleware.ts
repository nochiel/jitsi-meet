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

    switch (action.type) {
        case SET_WALLET_OPEN: {
            const roomId = getCurrentRoomId(state);

            // TODO(nochiel) Handle initialisation of the wallet if this is the first time opened.

            if (action.isOpen) {
                focusWallet(store);     // TODO(nochiel)
                dispatch(setupWallet({}));
            }

        break;
        }
        case RESET_WALLET: {
            raiseWalletNotification(WalletStatus.RESET)

            break;
        }
    }

})

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
                    dispatch(setupWallet({
                        collabDetails: metadata[WALLET_ID].collabDetails
                    }));
                    dispatch(setWalletOpen(true));
                }
            });
        }
    });
