import { Network } from './networks'

const bitcoin = require('bitcoinjs-lib');

export class Msint {
    NETWORK: Network;
    NETSYDE: string = "tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922";
    constructor (network: Network) {
        this.NETWORK = network
    }

    getRedeemScript (pubKeys: any) {
        const redeem = bitcoin.payments.p2ms(
            {
                m: 2,
                pubkeys: pubKeys,
                network: this.NETWORK
            }
        );
        return redeem;
    }

    keyPairFromWIF (WIF: any) {
        return bitcoin.ECPair.fromWIF(WIF, this.NETWORK)
    }

    keyPairsFromWIFs (WIFs: any) {
        return WIFs.map((wif: any) => this.keyPairFromWIF(wif))
    }

    generateKeyPair () {
        return bitcoin.ECPair.makeRandom({ network: this.NETWORK });
    }

    generateKeyPairs () {
        const keyPairs = [this.generateKeyPair(), this.generateKeyPair(), this.generateKeyPair()]
        return keyPairs
    }

    bufferFromHex (hex: any) {
        return Buffer.from(hex, 'hex');
    }

    pubKeyFromKeyPair (keyPair: any) {
        return keyPair.publicKey
    }

    pubKeysFromKeyPairs (keyPairs: any) {
        return keyPairs.map((keyPair: any) => this.pubKeyFromKeyPair(keyPair))
    }

}

//module.exports.Msint = Msint;