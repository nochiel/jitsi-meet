import { getLogger } from '../../../base/logging/functions';    // NOCHECKIN
const logger = getLogger('SendTip.ts');

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import { IReduxState } from '../../../app/types';
import { withPixelLineHeight } from '../../../base/styles/functions.web';
import { IJitsiParticipant } from '../../../base/participants/types';

import CopyButton from '../../../base/buttons/CopyButton.web';
import Select from '../../../base/ui/components/web/Select';

interface PayableAddress {
    participantId: number;
    address: string;
}

interface IProps {

    participantAddress: string;

    /**
     * participantIds and their corresponding addresses, if one exists.
     */
    payableAddresses: PayableAddress[];    // TODO(nochiel) {participantId, payableAddress}

}

const useStyles = makeStyles()(theme => {
    return {
        container: {
            display: 'flex',
            flexDirection: 'column' as const,
            padding: '0 2px',
            width: '100%'
        },
    };
});


function SendTip({ 
    participantAddress,
    payableAddresses,
}: IProps) {

    const { classes } = useStyles();
    const { t } = useTranslation();

    logger.debug(`XXX: ${payableAddresses?.map(e => e.participantId)}`);

    return (
        <Select
                label = 'Participants addresses'
                options = { payableAddresses?.map(e => {
                    return {
                        label: e.participantId,
                        value: e.address
                    }
                }) } />
        )
}

export default SendTip;