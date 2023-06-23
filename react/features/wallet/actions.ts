import {
    RESET_WALLET,
    SETUP_WALLET,
    SET_WALLET_OPEN
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
export const setupWallet = ({ collabDetails }: {
    collabDetails: { roomId: string; roomKey: string; };
}): IWalletAction => {
    return {
        type: SETUP_WALLET,
        collabDetails
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
export const setWalletOpen = (isOpen: boolean): IWalletAction => {
    return {
        type: SET_WALLET_OPEN,
        isOpen
    };
};
