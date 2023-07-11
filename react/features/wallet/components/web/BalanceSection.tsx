import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
// import { getDialInfoPageURL, hasMultipleNumbers } from '../../../functions';

import Balance from './Balance';

interface IProps {

    /**
     * The balance in the participant's wallet.
     */
    // TODO(nochiel)
    balance: number;
}

const useStyles = makeStyles()(theme => {
    return {
        container: {
            '& .balance-label': {
                ...withPixelLineHeight(theme.typography.bodyLongBold)
            }
        },

        link: {
            ...withPixelLineHeight(theme.typography.bodyLongRegular),
            color: theme.palette.link01,

            '&:hover': {
                color: theme.palette.link01Hover
            }
        }
    };
});

function BalanceSection({ balance } : IProps) {
    const { classes, cx } = useStyles();
    const conferenceId = useSelector(( state: IReduxState ) =>  state['features/wallet'].conferenceId);

    return (
        <div className = { classes.container }>
            <Balance
                conferenceId = { conferenceId ?? '' }
                balance = { balance } />
        </div>
    )
}

export default BalanceSection;