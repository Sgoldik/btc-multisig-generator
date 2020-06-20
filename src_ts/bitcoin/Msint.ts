import { Network } from './networks'

import { ECPair, ECPairInterface, Payment } from 'bitcoinjs-lib';
import * as bitcoinjs from 'bitcoinjs-lib'

export class Msint {
    NETWORK: Network;
    NETSYDE: string = "tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922";
    constructor (network: Network) {
        this.NETWORK = network
    }

    getRedeemScript (pubKeys: Array<Buffer>): Payment {
        const redeem = bitcoinjs.payments.p2ms(
            {
                m: 2,
                pubkeys: pubKeys,
                network: this.NETWORK
            }
        );
        //console.log(redeem)
        return redeem;
    }

    keyPairFromWIF (WIF: string): ECPairInterface {
        return bitcoinjs.ECPair.fromWIF(WIF, this.NETWORK);
    }

    keyPairsFromWIFs (WIFs: Array<string>): Array<ECPairInterface> {
        return WIFs.map((wif: any) => this.keyPairFromWIF(wif));
    }

    generateKeyPair (): ECPairInterface {
        return bitcoinjs.ECPair.makeRandom({ network: this.NETWORK });
    }

    generateKeyPairs (): Array<ECPairInterface> | false {
        try {
            const keyPairs = [this.generateKeyPair(), this.generateKeyPair(), this.generateKeyPair()]
            return keyPairs;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    bufferFromHex (hex: any): Buffer {
        return Buffer.from(hex, 'hex');
    }

    pubKeyFromKeyPair (keyPair: ECPairInterface) {
        return keyPair.publicKey
    }

    pubKeysFromKeyPairs (keyPairs: Array<ECPairInterface>) {
        return keyPairs.map((keyPair: any) => this.pubKeyFromKeyPair(keyPair))
    }

}