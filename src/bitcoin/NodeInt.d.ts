export default class NodeInt {
    API: string;
    constructor(API: string);
    getHash(address: string): Promise<any>;
    getScriptPubKey(address: string): Promise<any>;
    getBalance(address: string): Promise<any>;
    getTxInfo(tx: string): Promise<any>;
    getTxAddresses(tx: string): Promise<Array<string>>;
    getTxOutputsWithBalance(tx: string): Promise<any>;
}
