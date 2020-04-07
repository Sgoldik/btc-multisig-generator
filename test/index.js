const bitcoin = require('bitcoinjs-lib');
const { Msint } = require('../src/Msint');
const { NodeInt } = require('../src/NodeInt');
const { Wallet } = require('../src/Wallet');
const NETWORK = bitcoin.networks.testnet
const FEE = 201;
const NETSYDEFEE = 10000;
const API = 'https://api.blockcypher.com/v1/btc/test3'

var keyPairs = [
    'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x',
    'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY',
    'cTtSYats6xkYCPk3fsfyxTeyUxRxVYHFWwmreVHAKN7UxXyu6pw8'
].map(wif => bitcoin.ECPair.fromWIF(wif, NETWORK))

let sendingTx = async () => {
    const wallet = new Wallet(NETWORK, keyPairs)
    const address = wallet.create()
    console.log(address)
    const key1 = 'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x'
    const key2 = 'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY'

    let input = new NodeInt('tb1q6facue04fhsag9mj9tjqj0msvt0s83x33k48aaap0z0nzafg7naskkt78d', API)
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