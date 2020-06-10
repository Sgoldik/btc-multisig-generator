"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin = require('bitcoinjs-lib');
const Msint_1 = require("./Msint");
class Transaction extends Msint_1.Msint {
    constructor(network) {
        super(network);
        this.NETSYDEFEE = 10000;
        this.psbt;
    }
    create() {
        this.psbt = new bitcoin.Psbt({ network: this.NETWORK });
    }
    addInput(prevHash, script, fullAmount) {
        const inputData = {
            hash: prevHash,
            index: 0,
            witnessUtxo: {
                script: Buffer.from(script, // scriptPubkey 
                'hex'),
                value: fullAmount,
            },
            witnessScript: this.getRedeemScript(this.pubKeys).output,
        };
        this.psbt.addInput(inputData);
    }
    addOutput(recipient, balance, fee) {
        this.psbt.addOutput({
            address: recipient,
            value: balance - fee - this.NETSYDEFEE,
        });
        this.psbt.addOutput({
            address: this.NETSYDE,
            value: this.NETSYDEFEE,
        });
    }
    sign(key) {
        this.psbt.signInput(0, this.keyPairFromWIF(key));
    }
    finalize() {
        this.psbt.finalizeAllInputs();
    }
    extract() {
        const tx = this.psbt.extractTransaction();
        return tx.toHex();
    }
    broadcast() {
        this.finalize();
        this.extract();
        // broadcast tx
    }
}
exports.default = Transaction;
// module.exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map