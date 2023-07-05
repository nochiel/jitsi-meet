import {
    RESET_WALLET,
    SETUP_WALLET,
    BEGIN_WALLET_OPEN
} from './actionTypes';
import { IWalletAction } from './reducer';

/**
 * Configures the wallet collaboration details.
 *
 * @param {Object} payload - The wallet settings.
 * @returns {{
 *     type: SETUP_Wallet,
 *     collabDetails: { roomId: string, roomKey: string }
 * }}
 */
export const setupWallet = (roomId?: string, participantId?: number): IWalletAction => {
    return {
        type: SETUP_WALLET,
        roomId: roomId,
        participantId: participantId
    };
};

/**
 * Cleans up the wallet collaboration settings.
 * To be used only on native for cleanup in between conferences.
 *
 * @returns {{
 *     type: RESET_WALLET
 * }}
 */
export const resetWallet = (): IWalletAction => {
    return { type: RESET_WALLET };
};

/**
 * Sets the wallet visibility status.
 *
 * @param {boolean} isOpen - The wallet visibility flag.
 * @returns {{
 *      type: SET_WALLET_OPEN,
 *      isOpen
 * }}
 */
export const beginWalletOpen = (isOpen: boolean): IWalletAction => {
    return {
        type: BEGIN_WALLET_OPEN,
        isOpen
    };
};
