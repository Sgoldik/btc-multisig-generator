"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoinjs = __importStar(require("bitcoinjs-lib"));
const Msint_1 = require("./Msint");
class Transaction extends Msint_1.Msint {
    constructor(network, pubKeys) {
        super(network);
        this.pubKeys = pubKeys;
        this.network = network;
    }
    create() {
        this.psbt = new bitcoinjs.Psbt({ network: this.NETWORK });
        //return this.psbt;
    }
    addInput(prevHash, script, fullAmount) {
        try {
            const inputData = {
                hash: prevHash,
                index: 1,
                witnessUtxo: {
                    script: Buffer.from(script, // scriptPubkey 
                    'hex'),
                    value: fullAmount,
                },
                witnessScript: this.getRedeemScript(this.pubKeys).output,
            };
            this.psbt.addInput(inputData);
        }
        catch (e) {
            console.log(e);
        }
    }
    addOutput(recipient, balance, fee) {
        this.psbt.addOutput({
            address: recipient,
            value: balance - fee,
        });
    }
    sign(key, index) {
        this.psbt.signInput(index, this.keyPairFromWIF(key));
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
        let extract = this.extract();
        return extract;
        // broadcast tx
    }
}
exports.default = Transaction;
// module.exports.Transaction = Transaction;
//# sourceMappingURL=Transaction.js.map