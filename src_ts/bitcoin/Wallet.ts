const bitcoin = require('bitcoinjs-lib');
import { Msint } from './Msint'

export default class Wallet extends Msint {
    network: string;
    keyPairs: any;
    pubKeys: any;
    constructor (network: string, keyPairs: any) {
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