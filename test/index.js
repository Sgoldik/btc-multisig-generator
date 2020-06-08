const { bitcoin, etherium } = require('../dist');
let NETWORK = bitcoin.networks.testnet
const FEE = 201;
const NETSYDEFEE = 10000;
const API = 'https://api.blockcypher.com/v1/btc/test3'

let msint = new bitcoin.Msint(NETWORK);
const test = msint.generateKeyPairs();
console.log(test)

let sendingTx = async () => {
    const wallet = new bitcoin.Wallet(NETWORK, keyPairs)
    const address = wallet.create()
    console.log(address)
    const key1 = 'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x'
    const key2 = 'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY'
    
    const tx = new bitcoin.Transaction(NETWORK).create()
    let input = new bitcoin.NodeInt(API)
    let hash = await input.getHash(address)
    console.log(hash)

    let script = await input.getScriptPubKey(address)
    console.log(script)

    let balance = await input.getBalance(address)
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

const checkTx = async () => {
    let node = new bitcoin.NodeInt(API)
    let test = await node.getTxInfo("d21a2aa1b276f4b8b42d4049f3aeed88dde888d9fc114362134f7c6fb4e57447")
    console.log(test)

}

//checkTx()