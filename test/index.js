const { bitcoin, etherium } = require('../src');
const bitcoinjs = require ('bitcoinjs-lib');

let NETWORK = bitcoin.networks.testnet;
const FEE = 400;
const API = 'https://api.blockcypher.com/v1/btc/test3'

let msint = new bitcoin.Msint(NETWORK);
const keyPairs = [
    'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x',
    'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY',
    'cTtSYats6xkYCPk3fsfyxTeyUxRxVYHFWwmreVHAKN7UxXyu6pw8'
].map(wif => msint.keyPairFromWIF(wif))

let sendingTx = async () => {
    const address = new bitcoin.Wallet(NETWORK, keyPairs).create();
    console.log(address)
    const key1 = 'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x';
    const key2 = 'cTtSYats6xkYCPk3fsfyxTeyUxRxVYHFWwmreVHAKN7UxXyu6pw8';
    const pubKeys = msint.pubKeysFromKeyPairs(keyPairs);
    const tx = new bitcoin.Transaction(NETWORK, pubKeys)
    tx.create()
    //console.log(tx)
    let input = new bitcoin.NodeInt(API)
    //let hash = await input.getHash(address)
    let hashes = await input.getAllInputsHashes(address);
    console.log(hashes)
    hashes.forEach(async hash => {
        let inputData = await input.getInputData(address, hash);
        console.log(hash, inputData.script, inputData.value)
        tx.addInput(hash, inputData.script, inputData.value)
    })
    
    let balance = await input.getBalance(address)
    // Gets hash, script and fullAmount and after ->
    //tx.addInput(hash, script, balance)

    // Gets buyer address, amount and after ->
    const recipient = '2MuiUfitrSqckKDWydFfbA1mDjnaszzEhHL';
    // const transferAmount = 10000
    tx.addOutput(recipient, balance, FEE)

    // waiting for confirmation and after sign tx (1/3)
    hashes.forEach(async (hash, index) => {
        tx.sign(key1, index)

        // waiting for confirmation and after sign tx (2/3)

        tx.sign(key2, index)
    })
    //console.log(tx)

    // finalize and broadcast
    let txHex = tx.broadcast()
    console.log(txHex)

}
sendingTx()

// const checkTx = async () => {
//     let node = new bitcoin.NodeInt(API)
//     let test = await node.getTxInfo("d21a2aa1b276f4b8b42d4049f3aeed88dde888d9fc114362134f7c6fb4e57447")
    
//     console.log(test)

// }

// checkTx(

// describe('Msint module', () => {
//     it('it should generate key pairs', async (done) => {
//         const keyPairs = msint.generateKeyPairs();
//         if (keyPairs) {
//             done();
//         }
//     });

//     it('it should get public keys from key pairs', async (done) => {
//         const pubKeys = msint.pubKeysFromKeyPairs(keyPairs);
//         if (pubKeys) {
//             done();
//         }
//     });  

//     it('it should get keyPairs from WIFs', async (done) => {
//        const WIFs = [   
//             'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x',
//             'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY',
//             'cTtSYats6xkYCPk3fsfyxTeyUxRxVYHFWwmreVHAKN7UxXyu6pw8' 
//         ];
//         const keyPairs = msint.keyPairsFromWIFs(WIFs);
//         if (keyPairs) {
//             done();
//         }
//     });  
// });

// describe('Wallet module', () => {
//     it('it should create multisig wallet from exist key pairs', (done) => {
//         const wallet = new bitcoin.Wallet(NETWORK, keyPairs);
//         const info = wallet.getInfo();
//         //console.log(info);
//         if (info) {
//             done();
//         }
//     });
// });

// describe('Transaction module', () => {
//     const txCreate = () => {
//         const tx = new bitcoin.Transaction(NETWORK).create()
//         return tx;
//     }

//     it('it should create transaction', (done) => {
//         const tx = txCreate();
//         done();
//     })

//     it('it should add input in transaction', async () => {
//         let input = new bitcoin.NodeInt(API)
//         const address = new bitcoin.Wallet(NETWORK, keyPairs).create();
//         console.log(address)
//         const transaction = new bitcoin.Transaction(NETWORK);
//         transaction.create()
//         let hash = await input.getHash(address)
//         let script = await input.getScriptPubKey(address)
//         let balance = await input.getBalance(address)
//         console.log(hash, script, balance)
//         transaction.addInput(hash, script, balance)
//         //return txWithInput
//         //done()
//         // if (txWithInput) {
//         //     done()
//         // }
//     })


// })