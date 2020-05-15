import { ECPairInterface, Network } from "bitcoinjs-lib/types";
export declare class Wallet {
    constructor(network: Network, keyPairs: Array<ECPairInterface>);

    create(): string
    getInfo(): WalletInfo

}

interface WalletInfo {
    address: string;
    redeem: Array<string>;
    WIFs: Array<string>;
    pubKeys: Array<string>;
}