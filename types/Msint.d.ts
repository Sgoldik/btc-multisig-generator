import { ECPair } from "bitcoinjs-lib";

export declare class Msint {
    constructor(network: string);

    getRedeemScript(pubKeys: Array): string
    keyPairFromWIF(WIF: string): Array
    keyPairsFromWIFs(WIFS: Array): Array
    generateKeyPair(): ECPair
    generateKeyPairs(): Array<ECPair>
    bufferFromHex(hex: string): Buffer
    pubKeyFromKeyPair(keyPair: ECPair): string
    pubKeysFromKeyPairs(keyPairs: Array<ECPair>): Array<string>
    
}