/// <reference types="node" />
import { Network } from './networks';
export declare class Msint {
    NETWORK: Network;
    NETSYDE: string;
    constructor(network: Network);
    getRedeemScript(pubKeys: any): any;
    keyPairFromWIF(WIF: any): any;
    keyPairsFromWIFs(WIFs: any): any;
    generateKeyPair(): any;
    generateKeyPairs(): any[];
    bufferFromHex(hex: any): Buffer;
    pubKeyFromKeyPair(keyPair: any): any;
    pubKeysFromKeyPairs(keyPairs: any): any;
}
