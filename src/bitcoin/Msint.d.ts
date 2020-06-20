/// <reference types="node" />
import { Network } from './networks';
import { ECPairInterface, Payment } from 'bitcoinjs-lib';
export declare class Msint {
    NETWORK: Network;
    NETSYDE: string;
    constructor(network: Network);
    getRedeemScript(pubKeys: Array<Buffer>): Payment;
    keyPairFromWIF(WIF: string): ECPairInterface;
    keyPairsFromWIFs(WIFs: Array<string>): Array<ECPairInterface>;
    generateKeyPair(): ECPairInterface;
    generateKeyPairs(): Array<ECPairInterface> | false;
    bufferFromHex(hex: any): Buffer;
    pubKeyFromKeyPair(keyPair: ECPairInterface): Buffer;
    pubKeysFromKeyPairs(keyPairs: Array<ECPairInterface>): Buffer[];
}
