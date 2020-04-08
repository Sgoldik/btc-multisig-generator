const bitcoin = require('bitcoinjs-lib');
const { Msint } = require('./Msint');

class Transaction extends Msint {
    constructor (network) {
        super(network)
        this.psbt
        this.NETSYDEFEE = 10000
    }

    create () {
        this.psbt = new bitcoin.Psbt({ network: this.NETWORK })
    }

    addInput (prevHash, script, fullAmount) {
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

    addOutput (recipient, balance, fee) {
        this.psbt.addOutput({
            address: recipient,
            value: balance - fee - NETSYDEFEE,
        })
        this.psbt.addOutput({
            address: this.NETSYDE,
            value: this.NETSYDEFEE,
        })
    }

    sign (key) {
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

module.exports.Transaction = Transaction;