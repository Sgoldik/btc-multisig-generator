"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin = require('bitcoinjs-lib');
class Msint {
    constructor(network) {
        this.NETSYDE = "tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922";
        this.NETWORK = network;
    }
    getRedeemScript(pubKeys) {
        const redeem = bitcoin.payments.p2ms({
            m: 2,
            pubkeys: pubKeys,
            network: this.NETWORK
        });
        return redeem;
    }
    keyPairFromWIF(WIF) {
        return bitcoin.ECPair.fromWIF(WIF, this.NETWORK);
    }
    keyPairsFromWIFs(WIFs) {
        return WIFs.map((wif) => this.keyPairFromWIF(wif));
    }
    generateKeyPair() {
        return bitcoin.ECPair.makeRandom({ network: this.NETWORK });
    }
    generateKeyPairs() {
        const keyPairs = [this.generateKeyPair(), this.generateKeyPair(), this.generateKeyPair()];
        return keyPairs;
    }
    bufferFromHex(hex) {
        return Buffer.from(hex, 'hex');
    }
    pubKeyFromKeyPair(keyPair) {
        return keyPair.publicKey;
    }
    pubKeysFromKeyPairs(keyPairs) {
        return keyPairs.map((keyPair) => this.pubKeyFromKeyPair(keyPair));
    }
}
exports.Msint = Msint;
//module.exports.Msint = Msint;
//# sourceMappingURL=Msint.js.map