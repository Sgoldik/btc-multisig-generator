"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;
const MAINNET = bitcoin.networks.mainnet;
class Network {
    getTestnet() {
        return TESTNET;
    }
    getMainNet() {
        return MAINNET;
    }
}
exports.default = Network;
// module.exports.ethNetwork = Network;
//# sourceMappingURL=Network.js.map