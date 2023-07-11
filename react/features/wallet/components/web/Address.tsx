import React, { Component } from 'react';
import { WithTranslation } from 'react-i18next';

import { translate } from '../../../base/i18n/functions';
import Icon from '../../../base/icons/components/Icon';
import { IconCopy } from '../../../base/icons/svg';
import { copyText } from '../../../base/util/copyText.web';
// import { _formatBalanceAmount } from '../../_utils';

interface IProps extends WithTranslation {

    conferenceId: string | number;
    balance: number;
    currency: string;
}


class Address extends Component<IProps> {

    constructor(props: IProps) {
        super(props);

        this._onCopyText = this._onCopyText.bind(this);
    }


    _onCopyText() {
        const { conferenceId, balance, currency, t } = this.props;     // TODO(nochiel) FINDOUT What is `t`? translate()?
        
        const balanceAmount = `${this._formatBalanceAmount(balance, currency)}`;
        const textToCopy = `${balanceAmount}`;

        copyText(textToCopy);
    }

    render() {
        const { conferenceId, balance, currency, t } = this.props;

        return (
            <div className = 'wallet-balanace'>
                <div>
                    <span className = 'balance-amount'>
                        <span className = 'info-label'>
                            { t('info.walletBalanceNumber') }
                        </span>
                        <span className = 'spacer'>&nbsp;</span>
                        <span className = 'info-value'>
                            { balance }
                        </span>
                    </span>
                </div>
                <a
                    aria-label = { t('info.copyNumber') }
                    className = 'balance-copy'
                    onClick = { this._onCopyText }
                    role = 'button'
                    tabIndex = { 0 }>
                    <Icon src = { IconCopy } />
                </a>
            </div>
        )

    }

}

export default translate(Address);