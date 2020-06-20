import { Msint } from './Msint';
import { Network } from './networks';
export default class Wallet extends Msint {
    network: Network;
    keyPairs: any;
    pubKeys: any;
    constructor(network: Network, keyPairs: any);
    create(): string;
    getInfo(): WalletInfo | false;
}
interface WalletInfo {
    address: string;
    redeem: string;
    WIFs: Array<string>;
    pubKeys: Array<string>;
}
export {};
