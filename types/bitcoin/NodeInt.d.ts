export declare class NodeInt {
    constructor(address: string, API: string);

    getHash(): string
    getScriptPubKey(): string
    getBalance(): number
    getTxInfo(tx: string): object

}