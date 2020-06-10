const bitcoin = require('bitcoinjs-lib');
import { Msint } from './Msint'
import { Network } from './networks'

export default class Wallet extends Msint {
    network: Network;
    keyPairs: any;
    pubKeys: any;
    constructor (network: Network, keyPairs: any) {
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
            WIFs: this.keyPairs.map((keyPair: any) => keyPair.toWIF()),
            pubKeys: this.keyPairs.map((keyPair: any) => keyPair.publicKey.toString('hex')),
        }
    }

}

//module.exports.Wallet = Wallet;