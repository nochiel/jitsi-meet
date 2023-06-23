import ReducerRegistry from '../base/redux/ReducerRegistry';

import { RESET_WALLET, SETUP_WALLET } from './actionTypes';

export interface IWalletState {

    /**
     * The wallet collaboration details.
     */
    collabDetails?: { roomId: string; roomKey: string; };   // TODO(nochiel)

    /**
     * The indicator which determines whether the wallet is open.
     *
     * @type {boolean}
     */
    isOpen: boolean;
}

const DEFAULT_STATE: IWalletState = {
    isOpen: false
};

export interface IWalletAction extends Partial<IWalletState> {

    /**
     * The wallet collaboration details.
     */
    collabDetails?: { roomId: string; roomKey: string; };

    /**
     * The action type.
     */
    type: string;
}

ReducerRegistry.register(
    'features/wallet',
    (state: IWalletState = DEFAULT_STATE, action: IWalletAction) => {
        switch (action.type) {
        case SETUP_WALLET: {
            return {
                ...state,
                isOpen: true,
                collabDetails: action.collabDetails
            };
        }
        case RESET_WALLET:
            return DEFAULT_STATE;
        }

        return state;
    });
