export declare class Wallet {
    constructor(network: string, keyPairs: Array<string>);

    create(): string
    getInfo(): WalletInfo

}

interface WalletInfo {
    address: string;
    redeem: Array;
    WIFs: Array;
    pubKeys: Array;
}