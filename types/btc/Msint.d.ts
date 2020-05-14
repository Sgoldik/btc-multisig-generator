import { ECPairInterface } from "bitcoinjs-lib/types";

export declare class Msint {
    constructor(network: string);

    getRedeemScript(pubKeys: Array<string>): string
    keyPairFromWIF(WIF: string): Array<string>
    keyPairsFromWIFs(WIFS: Array<string>): Array<string>
    generateKeyPair(): ECPairInterface
    generateKeyPairs(): Array<ECPairInterface>
    bufferFromHex(hex: string): Buffer
    pubKeyFromKeyPair(keyPair: ECPairInterface): string
    pubKeysFromKeyPairs(keyPairs: Array<ECPairInterface>): Array<string>
    
}