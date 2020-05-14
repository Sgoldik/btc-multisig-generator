const bitcoin = require('bitcoinjs-lib');
const { Msint, NodeInt, Wallet, Transaction } = require('../src/btc');
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
    
    const tx = new Transaction(NETWORK).create()
    let input = new NodeInt(address, API)
    let hash = await input.getHash()
    console.log(hash)

    let script = await input.getScriptPubKey()
    console.log(script)

    let balance = await input.getBalance()
    console.log(balance)

    // Gets hash, script and fullAmount and after ->
    tx.addInput(hash, script, balance)

    // Gets buyer address, amount and after ->
    const recipient = 'tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922';
    // const transferAmount = 10000
    tx.addOutput(recipient, balance, FEE)

    // waiting for confirmation and after sign tx (1/3)

    tx.sign(key1)

    // waiting for confirmation and after sign tx (2/3)

    tx.sign(key2)

    // finalize and broadcast
    tx.broadcast()

}
// sendingTx()