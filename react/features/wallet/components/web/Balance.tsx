import React, { Component } from 'react';
import { WithTranslation } from 'react-i18next';

import { translate } from '../../../base/i18n/functions';
import Icon from '../../../base/icons/components/Icon';
import { IconCopy } from '../../../base/icons/svg';
import { copyText } from '../../../base/util/copyText.web';
// import { _formatBalanceAmount } from '../../_utils';

interface IProps extends WithTranslationo {

    conferenceId: string | number;
    balance: number;
    currency: string;
}


class Balance extends Component<IProps> {

    constructor(props: IProps) {
        super(props);

        this._onCopyText = this._onCopyText.bind(this);
    }

    // TODO(nochiel)
    _formatBalanceAmount(amount: number, currency: string) {
        // TODO(nochiel) Add currency type e.g. sats, btc, eth.
        return amount;
     }

     copyText(text: string) {}

    _onCopyText() {
        const { conferenceId, balance, currency, t } = this.props;     // TODO(nochiel) FINDOUT What is `t`? translate()?
        
        const balanceLabel = t('info.balanceNumber');
        const balanceAmount = `${this._formatBalanceAmount(balance, currency)}`;
        const textToCopy = `${balanceLabel} ${balanceAmount}`;

        copyText(textToCopy);
    }

    render() {
        const { conferenceId, balance, currency, t } = this.props;

        return (
            <div className = 'wallet-balanace'>
                <div>
                    <span className = 'balance-amount'>
                        <span className = 'info-label'>
                            { t('info.balanceNumber') }
                        </span>
                        <span className = 'spacer'>&nbsp;</span>
                        <span className = 'info-value'>
                            { balance }
                        </span>
                    </span>
                </div>

            </div>
        )

    }

}

export default translate(Balance);