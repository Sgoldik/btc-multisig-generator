import { Msint } from './Msint';
export default class Wallet extends Msint {
    network: string;
    keyPairs: any;
    pubKeys: any;
    constructor(network: string, keyPairs: any);
    create(): any;
    getInfo(): {
        address: any;
        redeem: any;
        WIFs: any;
        pubKeys: any;
    };
}
