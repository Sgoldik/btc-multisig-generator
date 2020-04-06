const bitcoin = require('bitcoinjs-lib');
const NETWORK = bitcoin.networks.testnet
const FEE = 201;

class Msint {
    constructor (network) {
        this.NETWORK = network
        this.NETSYDE = "tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922"
    }

    getRedeemScript (pubKeys) {
        const redeem = bitcoin.payments.p2ms(
            {
                m: 2,
                pubkeys: pubKeys,
                network: this.NETWORK
            }
        );
        return redeem;
    }

    keyPairFromWIF (WIF) {
        return bitcoin.ECPair.fromWIF(WIF, this.NETWORK)
    }

    keyPairsFromWIFs (WIFs) {
        return WIFs.map(wif => this.keyPairFromWIF(wif))
    }

    generateKeyPair () {
        return bitcoin.ECPair.makeRandom({ network: this.NETWORK });
    }

    generateKeyPairs () {
        const keyPairs = [this.generateKeyPair(), this.generateKeyPair(), this.generateKeyPair()]
        return keyPairs
    }

    bufferFromHex (hex) {
        return Buffer.from(hex, 'hex');
    }

    pubKeyFromKeyPair (keyPair) {
        return keyPair.publicKey
    }

    pubKeysFromKeyPairs (keyPairs) {
        return keyPairs.map(keyPair => this.pubKeyFromKeyPair(keyPair))
    }

    getPrevTxId () {
        return 'd21a2aa1b276f4b8b42d4049f3aeed88dde888d9fc114362134f7c6fb4e57447'
    }

    getScriptPubKey () {
        return '0020f02e4e557ab47438ff82fba1e84c908f82c2b60578886d7ed9d80feeb195a218'
    }

}

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

    getFullAmount () {
        return 1000000
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

const msint = new Msint(NETWORK)
//const keyPairs = msint.generateKeyPairs()
//console.log(keyPairs)
var keyPairs = [ 
    'cR4Ho93us6VMYZuiLG42P8kM8XxKucy11n3HeD7frmu7vxBAooKD',
    'cRbx958r3q2YZgg1y237s9AaU9wHdHE11cmwA1X8bZbe4t4b3DV5',
    'cUhRE1WQg9mVSjgRqu1q35BUsUj6rX56jepfLnrYHy4RAyWYKtjZ'
].map(wif => bitcoin.ECPair.fromWIF(wif, NETWORK))

const wallet = new Wallet(NETWORK, keyPairs)
const info = wallet.getInfo()
console.log(info)
//const address = wallet.create()
//console.log(address)
const key1 = 'cR4Ho93us6VMYZuiLG42P8kM8XxKucy11n3HeD7frmu7vxBAooKD'
const key2 = 'cUhRE1WQg9mVSjgRqu1q35BUsUj6rX56jepfLnrYHy4RAyWYKtjZ'
const tx = wallet.send(
    key1,
    key2,
    'eb540a4cadf791a3926d0861334795a379df1bace5488836c3d7cb432cfdd1da', // prev tx hash
    '0020342a73dfcbdda8ed74d9bae82621cb81dd53c149ba335242db61c30b343f8373', // script
    'tb1q6facue04fhsag9mj9tjqj0msvt0s83x33k48aaap0z0nzafg7naskkt78d', // recipient
    1000000, // full amount
    900000 - FEE, // transfer amount
    100000 // netsyde fee
)
console.log(tx)


