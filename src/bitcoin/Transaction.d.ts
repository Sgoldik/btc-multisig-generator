import { Msint } from './Msint';
export default class Transaction extends Msint {
    network: string;
    NETSYDEFEE: number;
    psbt: any;
    pubKeys: any;
    constructor(network: string);
    create(): void;
    addInput(prevHash: any, script: any, fullAmount: any): void;
    addOutput(recipient: any, balance: any, fee: any): void;
    sign(key: any): void;
    finalize(): void;
    extract(): any;
    broadcast(): void;
}
