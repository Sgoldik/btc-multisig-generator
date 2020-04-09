export declare class NodeInt {
    constructor(address: string, API: URL);

    getHash(): string
    getScriptPubKey(): string
    getBalance(): number

}