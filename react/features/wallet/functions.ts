import md5 from 'js-md5';

import { getPinnedParticipant } from '../base/participants/functions';
import { IReduxState } from '../app/types';
import { getCurrentConference } from '../base/conference/functions';
import { getRemoteParticipants, isLocalParticipantModerator } from '../base/participants/functions';
import { appendURLParam } from '../base/util/uri';
import { getCurrentRoomId, isInBreakoutRoom } from '../breakout-rooms/functions';

import { WALLET_ID } from './constants';
import { IWalletState } from './reducer';

const getWalletState = (state: IReduxState): IWalletState => state['features/wallet'];  // TODO(nochiel) Verify that this works.

/**
 * Indicates whether the wallet is enabled in the config.
 *
 * @param {IReduxState} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWalletEnabled = (state: IReduxState): boolean => true        // FIXME(nochiel) Remove this and use a correct state check if it works.
/*
export const isWalletEnabled = (state: IReduxState): boolean =>
    state['features/base/config'].wallet?.enabled
    // TODO(nochiel) What configuration do we need for a wallet?
    // - walletType (e.g. LNBits, WalletConnect)
    // FIXME(nochiel) Where is this set?
    && state['features/base/config'].wallet?.walletServerBaseUrl
    && getCurrentConference(state)?.getMetadataHandler()
?.isSupported();
*/

/**
 * Indicates whether the wallet is open.
 *
 * @param {IReduxState} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWalletOpen = (state: IReduxState): boolean => getWalletState(state).isOpen;

/**
 * Indicates whether the wallet button is visible.
 *
 * @param {IReduxState} state - The state from the Redux store.
 * @returns {boolean}
 */

export const isWalletButtonVisible = (state: IReduxState): boolean =>
    isWalletEnabled(state);

/**
 * Indicates whether the wallet is present as a meeting participant.
 *
 * @param {IReduxState} state - The state from the Redux store.
 * @returns {boolean}
 */
export const isWalletPresent = (state: IReduxState): boolean => getRemoteParticipants(state).has(WALLET_ID);

/**
 * Returns the wallet collaboration details.
 *
 * @param {IReduxState} state - The state from the Redux store.
 * @returns {{ roomId: string, roomKey: string}|undefined}
 */
export const getCollabDetails = (state: IReduxState): {
    roomId: string; roomKey: string;
} | undefined => getWalletState(state).collabDetails;

/**
 * Returns the wallet collaboration server url.
 *
 * @param {IReduxState} state - The state from the Redux store.
 * @returns {string}
 */
export const getWalletServerUrl = (state: IReduxState): string | undefined => {
    const walletServerBaseUrl = state['features/base/config'].wallet?.walletServerBaseUrl;

    if (!walletServerBaseUrl) {
        return;
    }

    const { locationURL } = state['features/base/connection'];
    const inBreakoutRoom = isInBreakoutRoom(state);
    const roomId = getCurrentRoomId(state);
    const room = md5.hex(`${locationURL?.href}${inBreakoutRoom ? `|${roomId}` : ''}`);

    return appendURLParam(walletServerBaseUrl, 'room', room);
};

// TODO(nochiel)
export function getPayableAddresses(conferenceId: number) {}