export enum WalletStatus {
    FORBIDDEN = 'FORBIDDEN',
    HIDDEN = 'HIDDEN',
    INSTANTIATED = 'INSTANTIATED',
    RESET = 'RESET',
    SHOWN = 'SHOWN'
}

export interface PayableAddress {
    participantId: number;
    address: string;
}