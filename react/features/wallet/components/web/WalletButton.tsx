import { connect } from 'react-redux';

import { createToolbarEvent } from '../../../analytics/AnalyticsEvents';
import { sendAnalytics } from '../../../analytics/functions';
import { translate } from '../../../base/i18n/functions';
import { IconWallet } from '../../../base/icons/svg';
import AbstractButton, { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import { beginWalletOpen } from '../../actions';

/**
 * Component that renders a toolbar button for the wallet.
 */
class WalletButton extends AbstractButton<AbstractButtonProps> {
    accessibilityLabel = 'toolbar.accessibilityLabel.wallet';   
    icon = IconWallet;
    label = 'toolbar.wallet';                                   
    tooltip = 'toolbar.wallet';

    /**
     * Handles clicking / pressing the button, and opens / closes the wallet view.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch } = this.props;

        sendAnalytics(createToolbarEvent('wallet'));
        dispatch(beginWalletOpen(true));
    }
}

export default translate(connect()(WalletButton));
