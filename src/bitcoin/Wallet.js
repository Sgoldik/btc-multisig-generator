"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin = require('bitcoinjs-lib');
const Msint_1 = require("./Msint");
class Wallet extends Msint_1.Msint {
    constructor(network, keyPairs) {
        super(network);
        this.keyPairs = keyPairs;
        this.pubKeys = this.pubKeysFromKeyPairs(this.keyPairs);
    }
    create() {
        const redeem = this.getRedeemScript(this.pubKeys);
        const p2wsh = bitcoin.payments.p2wsh({
            redeem: redeem,
            network: this.NETWORK
        });
        return p2wsh.address;
    }
    getInfo() {
        return {
            address: this.create(),
            redeem: this.getRedeemScript(this.pubKeys).output.toString('hex'),
            WIFs: this.keyPairs.map((keyPair) => keyPair.toWIF()),
            pubKeys: this.keyPairs.map((keyPair) => keyPair.publicKey.toString('hex')),
        };
    }
}
exports.default = Wallet;
//module.exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map