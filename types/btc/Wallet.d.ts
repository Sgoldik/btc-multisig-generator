export declare class Wallet {
    constructor(network: string, keyPairs: Array<string>);

    create(): string
    getInfo(): WalletInfo

}

interface WalletInfo {
    address: string;
    redeem: Array<string>;
    WIFs: Array<string>;
    pubKeys: Array<string>;
}