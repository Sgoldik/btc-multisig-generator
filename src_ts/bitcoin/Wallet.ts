import * as bitcoinjs from'bitcoinjs-lib';
import { Msint } from './Msint'
import { Network } from './networks'

export default class Wallet extends Msint {
    network: Network;
    keyPairs: any;
    pubKeys: any;
    constructor (network: Network, keyPairs: any) {
        super(network)
        this.network = network;
        this.keyPairs = keyPairs
        this.pubKeys = this.pubKeysFromKeyPairs(this.keyPairs)
    }
     
    create (): string {
        const redeem = this.getRedeemScript(this.pubKeys);
        const { address } = bitcoinjs.payments.p2wsh({
            redeem: redeem,
            network: this.network
          });
        return address
    }

    getInfo (): WalletInfo | false {
        try {
            return {
                address: this.create(),
                redeem: this.getRedeemScript(this.pubKeys).output.toString('hex'),
                WIFs: this.keyPairs.map((keyPair: any) => keyPair.toWIF()),
                pubKeys: this.keyPairs.map((keyPair: any) => keyPair.publicKey.toString('hex')),
            }
        } catch (e) {
            console.log(e);
            return false;
        }
    }

}

interface WalletInfo {
    address: string;
    redeem: string;
    WIFs: Array<string>;
    pubKeys: Array<string>;
}