export declare class NodeInt {
    constructor(API: string);

    getHash(address: string): string
    getScriptPubKey(address: string): string
    getBalance(address: string): number
    getTxInfo(tx: string): Promise<object>
    getTxAddresses(tx: string): Promise<Array<string>>
    getTxOutputsWithBalance(tx: string): Promise<Array<OutputWithValue>>
}

export interface OutputWithValue {
    address: string;
    value: number;
}