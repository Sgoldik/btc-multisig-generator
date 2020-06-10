import { Msint } from './Msint';
import { Network } from './networks';
export default class Wallet extends Msint {
    network: Network;
    keyPairs: any;
    pubKeys: any;
    constructor(network: Network, keyPairs: any);
    create(): any;
    getInfo(): {
        address: any;
        redeem: any;
        WIFs: any;
        pubKeys: any;
    };
}
