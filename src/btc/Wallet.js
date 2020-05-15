const bitcoin = require('bitcoinjs-lib');
const { Msint } = require('./Msint');

class Wallet extends Msint {
    constructor (network, keyPairs) {
        super(network)
        this.keyPairs = keyPairs
        this.pubKeys = this.pubKeysFromKeyPairs(this.keyPairs)
    }
    
    create () {
        const redeem = this.getRedeemScript(this.pubKeys);
        const p2wsh = bitcoin.payments.p2wsh(
            {
                redeem: redeem,
                network: this.NETWORK
            }
        );

        return p2wsh.address
    }

    getInfo () {
        return {
            address: this.create(),
            redeem: this.getRedeemScript(this.pubKeys).output.toString('hex'),
            WIFs: this.keyPairs.map(keyPair => keyPair.toWIF()),
            pubKeys: this.keyPairs.map(keyPair => keyPair.publicKey.toString('hex')),
        }
    }

}

module.exports.Wallet = Wallet;