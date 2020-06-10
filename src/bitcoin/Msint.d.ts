/// <reference types="node" />
export declare class Msint {
    NETWORK: string;
    NETSYDE: string;
    constructor(network: string);
    getRedeemScript(pubKeys: any): any;
    keyPairFromWIF(WIF: any): any;
    keyPairsFromWIFs(WIFs: any): any;
    generateKeyPair(): any;
    generateKeyPairs(): any[];
    bufferFromHex(hex: any): Buffer;
    pubKeyFromKeyPair(keyPair: any): any;
    pubKeysFromKeyPairs(keyPairs: any): any;
}
