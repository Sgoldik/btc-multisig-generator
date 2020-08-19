const { bitcoin, etherium } = require('../src');
const readline = require('readline-sync');
const opn = require('opn');


// Link to check balance
const API = 'https://api.blockcypher.com/v1/btc/test3'

// Get balance function
let getBalance = async () => {
    let input = new bitcoin.NodeInt(API)
    let balance = await input.getBalance(address)
    console.log(balance)
}

// Create multisignature wallet
const NETWORK = bitcoin.networks.testnet;
let msint = new bitcoin.Msint(NETWORK);
const keyPairs = msint.generateKeyPairs();
const wallet = new bitcoin.Wallet(NETWORK, keyPairs);
const address = wallet.create();

// Prints adress and keys
console.log(`Wallet's adress: ${address}`)
console.log(wallet.getInfo().WIFs)

// Default recipient
const defaultRecipient = 'tb1q4fc9dmywxvvn3yr55cq6ufgcgdgkg0nnerxskjcjzmzjk3zs57pqa752vn'
const repKey1 = 'cN1qhmUyhQix1KAGaDiCHrbC1KHcvoWuHy6oYNaMAV8gTiADSdvz'
const repKey2 = 'cP4Cjfy3PcLiANs1HGzUvcjxfM7V5B1qtxodU9NP3yCnU1G7j1Jt'
const repKeyPairs = [
    'cN1qhmUyhQix1KAGaDiCHrbC1KHcvoWuHy6oYNaMAV8gTiADSdvz',
    'cP4Cjfy3PcLiANs1HGzUvcjxfM7V5B1qtxodU9NP3yCnU1G7j1Jt',
    'cUzYvA8e7T96uQQEmtDWsLXdoZEyWBrwYzPoySTK4ApquNpNgjS3'
].map(wif => msint.keyPairFromWIF(wif))


// Transfer commission
const FEE = 400

// Transaction func (test #1)
let sendingTx = async (address, key1, key2, recipient, FEE, keyPairs) => {
    console.log(`Sender: ${address}`)
    console.log(`Recipient: ${recipient}`)
    const pubKeys = msint.pubKeysFromKeyPairs(keyPairs)
    const tx = new bitcoin.Transaction(NETWORK, pubKeys)
    tx.create()

    let input = new bitcoin.NodeInt(API)
    let hashes = await input.getAllInputsHashes(address);
    console.log(`Hashes: ${hashes}`)

    for (let i = 0; i < hashes.length; i++) {
        let inputData = await input.getInputData(address, hashes[i]);
        let vout = await input.getVout(hashes[i], address)
        console.log(hashes[i], inputData.script, inputData.value, vout)
        tx.addInput(hashes[i], inputData.script, inputData.value, vout)
    }
    
    let balance = await input.getBalance(address)

    // Gets buyer address, amount and after ->
    // const transferAmount = 10000
    tx.addOutput(recipient, balance, FEE)

    // waiting for confirmation and after sign tx (1/3)
    hashes.forEach(async (hash, index) => {
        tx.sign(key1, index)

        // waiting for confirmation and after sign tx (2/3)

        tx.sign(key2, index)
    })

    // finalize and broadcast
    let txHex = tx.broadcast()
    console.log(`Hex: ${txHex}`)
}

// Menu cycle
const menu = async () => {
    let on = true
    while(on) {
        const answ = readline.question('What u wanna do?\n(Type number and press enter)\n 1 - Check balance\n 2 - Add BTC to wallet (from faucet)\n 3 - Add BTC to wallet (from recipient)\n 4 - Make a transaction\n\n')
        switch (answ) {
            case '1':
                await getBalance()
                break
            case '2':
                opn('https://bitcoinfaucet.uo1.net/')
                opn('https://testnet-faucet.mempool.co/')
                break
            case '3':
                await sendingTx(defaultRecipient, repKey1, repKey2, address, FEE, repKeyPairs)
                const raw = readline.question('Raw transaction? (y/n): ')
                if (raw == 'y') {
                    opn('https://tbtc.bitaps.com/broadcast')
                }
                break
            case '4':
                const key1 = readline.question('Enter key1: ')
                const key2 = readline.question('Enter key2: ')
                let recipient = readline.question('Enter recipient`s adress\n (Use default: tb1q4fc9dmywxvvn3yr55cq6ufgcgdgkg0nnerxskjcjzmzjk3zs57pqa752vn (type y) \n): ')
                if (recipient == 'y') {
                    recipient = defaultRecipient
                }
                await sendingTx(address, key1, key2, recipient, FEE, keyPairs)
                const check = readline.question('Raw transaction? (y/n): ')
                if (check == 'y') {
                    opn('https://tbtc.bitaps.com/broadcast')
                    on = false
                }
                else {
                    on = false
                }
                break
        }
    }
}

menu()