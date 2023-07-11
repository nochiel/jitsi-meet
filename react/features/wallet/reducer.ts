import ReducerRegistry from '../base/redux/ReducerRegistry';

import { RESET_WALLET, SETUP_WALLET } from './actionTypes';
import { PayableAddress } from '../../types';

export interface IWalletState {

    /**
     * The wallet collaboration details.
     */
    conferenceId?: string;   // TODO(nochiel)

    participantId?: string;     

    addresses?: PayableAddress[];
    /**
     * The indicator which determines whether the wallet is open.
     *
     * @type {boolean}
     */
}

const DEFAULT_STATE: IWalletState = {
    addresses: [],
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
                    conferenceId: action.conferenceId,
                    participantId: action.participantId
                };
            }
            case RESET_WALLET:
                return DEFAULT_STATE;
        }

        return state;
    });
