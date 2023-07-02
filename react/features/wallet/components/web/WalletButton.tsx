import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { translate } from '../../../base/i18n/functions';
import { IconWallet } from '../../../base/icons/svg';
import AbstractButton, { IProps as AbstractButtonProps } from '../../../base/toolbox/components/AbstractButton';
import { setOverflowMenuVisible } from '../../../toolbox/actions.web';
import { setWalletOpen } from '../../actions';
import { isWalletVisible } from '../../functions';

interface IProps extends AbstractButtonProps {

    /**
     * Whether or not the button is toggled.
     */
    _toggled: boolean;
}

/**
 * Component that renders a toolbar button for the wallet.
 */
class WalletButton extends AbstractButton<IProps> {
    accessibilityLabel = 'toolbar.accessibilityLabel.showWallet';   
    toggledAccessibilityLabel = 'toolbar.accessibilityLabel.hideWallet';   
    icon = IconWallet;
    label = 'toolbar.showWallet';                                   
    toggledIcon = IconWallet;
    toggledLabel = 'toolbar.hideWallet';
    toggledTooltip = 'toolbar.hideWallet';
    tooltip = 'toolbar.showWallet';

    /**
     * Handles clicking / pressing the button, and opens / closes the wallet view.
     *
     * @private
     * @returns {void}
     */
    _handleClick() {
        const { dispatch, _toggled } = this.props;

        dispatch(setWalletOpen(!_toggled));
        dispatch(setOverflowMenuVisible(false));
    }

    /**
     * Indicates whether this button is in toggled state or not.
     *
     * @override
     * @protected
     * @returns {boolean}
     */
    _isToggled() {
        return this.props._toggled;
    }
}

/**
 * Maps part of the Redux state to the props of this component.
 *
 * @param {Object} state - The Redux state.
 * @private
 * @returns {IProps}
 */
function _mapStateToProps(state: IReduxState) {
    return {
        _toggled: isWalletOpen(state)
    };
}

export default translate(connect(_mapStateToProps)(WalletButton));
