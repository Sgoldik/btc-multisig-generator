export declare class Wallet {
    constructor(network: URL, keyPairs: Array);

    create(): string
    getInfo(): WalletInfo

}

interface WalletInfo {
    address: string;
    redeem: Array;
    WIFs: Array;
    pubKeys: Array;
}