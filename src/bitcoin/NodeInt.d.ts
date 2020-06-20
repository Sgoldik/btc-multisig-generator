export default class NodeInt {
    API: string;
    constructor(API: string);
    getHash(address: string): Promise<any>;
    getScriptPubKey(address: string, hash: string): Promise<any>;
    getBalance(address: string): Promise<any>;
    getInputBalance(address: string, hash: string): Promise<any>;
    getInputData(address: string, hash: string): Promise<{
        value: any;
        script: any;
    }>;
    getTxInfo(tx: string): Promise<any>;
    getTxAddresses(tx: string): Promise<Array<string>>;
    getTxOutputsWithBalance(tx: string): Promise<any>;
    getAllInputsHashes(address: string): Promise<any>;
}
