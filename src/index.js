const bitcoin = require('bitcoinjs-lib');
const axios = require('axios');

const NETWORK = bitcoin.networks.testnet
const FEE = 201;
const NETSYDEFEE = 10000;
const API = 'https://api.blockcypher.com/v1/btc/test3'


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

var keyPairs = [
    'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x',
    'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY',
    'cTtSYats6xkYCPk3fsfyxTeyUxRxVYHFWwmreVHAKN7UxXyu6pw8'
].map(wif => bitcoin.ECPair.fromWIF(wif, NETWORK))

class nodeInt {
    constructor (address) {
        this.address = address;
    }

    async getHash () { // hash = prev tx id
        const response = await axios.get(`${API}/addrs/${this.address}`);
        return response.data.txrefs[0].tx_hash;
    }

    async getScriptPubKey () {
        const hash = await this.getHash(this.address);
        const response = await axios.get(`${API}/txs/${hash}?includeHex=true`);
        return response.data.outputs[0].script;
    }

    async getBalance () {
        const response = await axios.get(`${API}/addrs/${this.address}`);
        return response.data.balance;
    }
}

let sendingTx = async () => {
    const wallet = new Wallet(NETWORK, keyPairs)
    const address = wallet.create()
    console.log(address)
    const key1 = 'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x'
    const key2 = 'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY'

    let input = new nodeInt('tb1q6facue04fhsag9mj9tjqj0msvt0s83x33k48aaap0z0nzafg7naskkt78d')
    let hash = await input.getHash()
    let script = await input.getScriptPubKey()
    let balance = await input.getBalance()
    console.log(hash)
    console.log(script)
    console.log(balance)

    const tx = wallet.send(
        key1,
        key2,
        hash, // prev tx hash
        script, // script
        'tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922', // recipient
        balance, // full amount
        balance - NETSYDEFEE - FEE, // transfer amount
        NETSYDEFEE // netsyde fee
    )
    console.log(tx)

}
sendingTx()