
const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet
const MAINNET = bitcoin.networks.mainnet

export default class Network {
    getTestnet () {
        return TESTNET
    }

    getMainNet () {
        return MAINNET
    }
}

// module.exports.ethNetwork = Network;