const bitcoin = require('bitcoinjs-lib');
import { Msint } from './Msint';
import { Network } from './networks';

export default class Transaction extends Msint {
    network: Network
    NETSYDEFEE = 10000;
    psbt: any
    pubKeys: any // test this
    
    constructor (network: Network) {
        super(network)
        this.psbt
    }

    create () {
        this.psbt = new bitcoin.Psbt({ network: this.NETWORK })
    }

    addInput (prevHash: any, script: any, fullAmount: any) {
        const inputData = {
            hash: prevHash, // prev tx id
            index: 0,
            witnessUtxo: {
                script: Buffer.from(
                    script, // scriptPubkey 
                    'hex',
                ),
                value: fullAmount,
            },
            witnessScript: this.getRedeemScript(this.pubKeys).output, // A Buffer of the witnessScript for P2WSH
        }
        this.psbt.addInput(inputData);
    }

    addOutput (recipient: any, balance: any, fee: any) {
        this.psbt.addOutput({
            address: recipient,
            value: balance - fee - this.NETSYDEFEE,
        })
        this.psbt.addOutput({
            address: this.NETSYDE,
            value: this.NETSYDEFEE,
        })
    }

    sign (key: any) {
        this.psbt.signInput(0, this.keyPairFromWIF(key))
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
        this.extract()
        // broadcast tx
    }
    
}

// module.exports.Transaction = Transaction;