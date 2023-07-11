import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { withPixelLineHeight } from '../../../base/styles/functions.web';

import CopyButton from '../../../base/buttons/CopyButton.web';

interface IProps {

    /**
     * The address of a participant's wallet.
     */
    address: string;
}

const useStyles = makeStyles()(theme => {
    return {
        container: {
            '& .address-label': {
                ...withPixelLineHeight(theme.typography.bodyLongBold)
            }
        },

        link: {
            ...withPixelLineHeight(theme.typography.bodyLongRegular),
            color: theme.palette.link01,

            '&:hover': {
                color: theme.palette.link01Hover
            }
        },

        label: {
            display: 'block',
            marginBottom: theme.spacing(2)
        } 
    }
});

function AddressSection({ address } : IProps) {
    const { classes } = useStyles();
    const { t } = useTranslation();
    const conferenceId = useSelector(( state: IReduxState ) =>  state['features/wallet'].conferenceId);

    return (
        <div className='wallet-address'>
            <label 
                className={ classes.label }
                htmlFor = { 'copy-button-id' }
                id = 'copy-button-label'>
                { t('wallet.address') }
            </label>
            <CopyButton
                aria-label = { t('addPeople.copyAddress') }
                className = 'participant-wallet-address-url'
                displayedText = { address }
                id = 'copy-button-id'
                textOnCopySuccess = { t('wallet.addressCopied') }
                textOnHover = { t('wallet.copyAddress') }
                textToCopy = { address } 
            />
        </div>
    )
}

export default AddressSection;