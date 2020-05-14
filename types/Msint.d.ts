import { ECPair } from "bitcoinjs-lib";

export declare class Msint {
    constructor(network: string);

    getRedeemScript(pubKeys: Array<string>): string
    keyPairFromWIF(WIF: string): Array<string>
    keyPairsFromWIFs(WIFS: Array<string>): Array<string>
    generateKeyPair(): ECPair
    generateKeyPairs(): Array<ECPair>
    bufferFromHex(hex: string): Buffer
    pubKeyFromKeyPair(keyPair: ECPair): string
    pubKeysFromKeyPairs(keyPairs: Array<ECPair>): Array<string>
    
}