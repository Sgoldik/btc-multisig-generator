import { Msint } from './Msint';
import { Network } from './networks';
export default class Transaction extends Msint {
    network: Network;
    NETSYDEFEE: number;
    psbt: any;
    pubKeys: any;
    constructor(network: Network);
    create(): void;
    addInput(prevHash: any, script: any, fullAmount: any): void;
    addOutput(recipient: any, balance: any, fee: any): void;
    sign(key: any): void;
    finalize(): void;
    extract(): any;
    broadcast(): void;
}
