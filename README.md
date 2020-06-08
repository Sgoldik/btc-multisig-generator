# Crypto interaction
[![Build Status](https://travis-ci.com/netsyde/crypto-interaction.svg?token=upLq4Mcq8TPEeQG36nvV&branch=master)](https://travis-ci.com/netsyde/crypto-interaction)


## About crypto interaction
Crypto interaction is a module of the crypto2bot that allows you to interact with the BTC, ETH and LTC blockchains.

## Install
* yarn add https://github.com/netsyde/crypto-interaction

## Usage
### Create multisignature wallet
```javascript
import { bitcoin } from 'crypto-interaction';
const testnet = new bitcoin.Network().getTestnet()

const keyPairs = bitcoin.Msint(testnet).generateKeyPairs();
const wallet = new bitcoin.Wallet(testnet, keyPairs);
const address = wallet.create();
console.log(address)
```

### Create transaction and sign it
```javascript
import { bitcoin } from 'crypto-interaction';

const tx = new bitcoin.Transaction(NETWORK).create();
let input = new bitcoin.NodeInt(API);
let hash = await input.getHash(address);
console.log(hash);

const key1 = 'cMorAV1Ww74rbQAq1v5LRahB7BQ7LQNAThiJjtum1BepXzxnQ38x'
const key2 = 'cVzM1Ukhx3pwvyAikBEnUvN8vNeviRdswuZFP6cwiLxpg7j1t8wY'

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
```