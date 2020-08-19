import * as bitcoinjs from 'bitcoinjs-lib';
import { Msint } from './Msint';
import { Network } from './networks';

export default class Transaction extends Msint {
    network: Network
    psbt: bitcoinjs.Psbt
    pubKeys: any // test this
    
    constructor (network: Network, pubKeys: any) {
        super(network)
        this.pubKeys = pubKeys
        this.network = network
    }
    
    create () {
        this.psbt = new bitcoinjs.Psbt({ network: this.NETWORK });
        //return this.psbt;
    }

    addInput (prevHash: string, script: string, fullAmount: number, index: number) {
        try {
            const inputData = {
                hash: prevHash, // prev tx id
                index: 1, // TO-DO: add index check // id address in tx
                witnessUtxo: {
                    script: Buffer.from(
                        script, // scriptPubkey 
                        'hex',
                    ),
                    value: fullAmount,
                },
                witnessScript: this.getRedeemScript(this.pubKeys).output,
            }
            this.psbt.addInput(inputData);
        } catch (e) {
            console.log(e)
        }
    }

    addOutput (recipient: string, balance: any, fee: any) {
        this.psbt.addOutput({
            address: recipient,
            value: balance - fee,
        })
    }

    sign (key: string, index: number) {
        this.psbt.signInput(index, this.keyPairFromWIF(key))
    }

    finalize () {
        this.psbt.finalizeAllInputs();
    }

    extract () {
        const tx = this.psbt.extractTransaction();
        return tx.toHex()
    }

    broadcast () {
        this.finalize()
        let extract = this.extract()
        return extract;
        // broadcast tx
    }
    
}

// module.exports.Transaction = Transaction;