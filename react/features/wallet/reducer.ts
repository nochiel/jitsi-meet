import ReducerRegistry from '../base/redux/ReducerRegistry';

import { RESET_WALLET, SETUP_WALLET } from './actionTypes';

export interface IWalletState {

    /**
     * The wallet collaboration details.
     */
    roomId?: string;   // TODO(nochiel)

    participantId?: int     // TODO(nochiel) This should be a list of participants?

    /**
     * The indicator which determines whether the wallet is open.
     *
     * @type {boolean}
     */
    isOpen: boolean;
}

const DEFAULT_STATE: IWalletState = {
    roomId: '',
    isOpen: false
};

export interface IWalletAction extends Partial<IWalletState> {

    /**
     * The action type.
     */
    type: string;
}

ReducerRegistry.register(
    'features/wallet',
    (state: IWalletState = DEFAULT_STATE, action: IWalletAction) => {
        switch (action.type) {
            case SETUP_WALLET: {    // FIXME(nochiel) When is this Action ever called?
                return {
                    ...state,
                    isOpen: true
                };
            }
            case RESET_WALLET:
                return DEFAULT_STATE;
        }

        return state;
    });
