import * as bitcoinjs from 'bitcoinjs-lib';
import { Msint } from './Msint';
import { Network } from './networks';
export default class Transaction extends Msint {
    network: Network;
    psbt: bitcoinjs.Psbt;
    pubKeys: any;
    constructor(network: Network, pubKeys: any);
    create(): void;
    addInput(prevHash: string, script: string, fullAmount: number, index: number): void;
    addOutput(recipient: string, balance: any, fee: any): void;
    sign(key: string, index: number): void;
    finalize(): void;
    extract(): string;
    broadcast(): string;
}
