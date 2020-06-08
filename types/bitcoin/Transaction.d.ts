export declare class Transaction {
    constructor(network: string, keyPairs: Array<string>);

    create(): this
    addInput(prevHash: string, script: string, fullAmount: number): this
    addOutput(recipient: string, balance: number, fee: number): any
    sign(key: string): any
    finalize(): this
    extract(): string
    broadcast(): this

}