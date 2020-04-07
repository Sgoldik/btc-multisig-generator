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

    send (key1, key2, prevHash, script, recipient, fullAmount, transferAmount, fee) {
        this.getBalance
        const inputData = {
            hash: prevHash, // prev tx id
            index: 0,
            witnessUtxo: {
                script: Buffer.from(
                    script, // scriptPubkey 
                    'hex',
                ),
                value: fullAmount,
            },
            witnessScript: this.getRedeemScript(this.pubKeys).output, // A Buffer of the witnessScript for P2WSH
        }
        const psbt = new bitcoin.Psbt({ network: this.NETWORK })
            .addInput(inputData)
            .addOutput({
                address: recipient,
                value: transferAmount,
            })
            .addOutput({
                address: this.NETSYDE,
                value: fee,
            })
            .signInput(0, this.keyPairFromWIF(key1))
            .signInput(0, this.keyPairFromWIF(key2))
            .finalizeAllInputs();
            
        const tx = psbt.extractTransaction();
        return tx.toHex()
    }

    getInfo () {
        return {
            address: this.create(),
            redeem: this.getRedeemScript(this.pubKeys).output.toString('hex'),
            WIFs: keyPairs.map(keyPair => keyPair.toWIF()),
            pubKeys: keyPairs.map(keyPair => keyPair.publicKey.toString('hex')),
        }
    }

}

module.exports.Wallet = Wallet;