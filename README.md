# Crypto interaction
[![Build Status](https://travis-ci.com/netsyde/crypto-interaction.svg?token=upLq4Mcq8TPEeQG36nvV&branch=master)](https://travis-ci.com/netsyde/crypto-interaction) [![Community Chat](https://img.shields.io/badge/Community-Chat-blueChat?style=flat-square&logo=telegram)](https://t.me/netsydechat)

## About crypto interaction
Crypto interaction is a module of the crypto2bot that allows you to interact with the Bitcoin blockchain. It is planned to support other cryptocurrencies, such as Ethereum, Litecoin, etc.
> The module is currently under active development, so we dont recommend using it in production.

## Features
* Сreate multi-signature wallets
* Сreate and send transactions from a multi signature wallet
* TypeScript typings

## Shortcuts
- [Install](#install)
- [Usage](#usage)
- [API docs](#api)

## Install
### yarn
* yarn add crypto-interaction

### npm
* npm i crypto-interaction

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
const testnet = new bitcoin.Network().getTestnet()
const FEE = 10000;

const tx = new bitcoin.Transaction(testnet).create();
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

## API
### Msint
**Msint** - utility module, containing the following functions:

#### generateKeyPairs
Function for generating KeyPairs.

##### Usage
```javascript
import { bitcoin } from 'crypto-interaction';

let NETWORK = bitcoin.networks.testnet;

const msint = new bitcoin.Msint(NETWORK);
const keyPairs = msint.generateKeyPairs();
```

#### pubKeysFromKeyPairs
Function for getting public keys from KeyPairs.

##### Args
* keyPairs

##### Usage
```javascript
const publicKeys = msint.pubKeysFromKeyPairs(keyPairs);
```

#### getRedeemScript
Function for generating Redeem Script.

##### Args
* pubKeys

##### Usage
```javascript
const redeemScript = msint.getRedeemScript(pubKeys);
```

#### keyPairsFromWIFs
Function for getting key pairs from WIFs.

##### Args
* WIFs

##### Usage
```javascript
let keyPairs = msint.keyPairsFromWIFs(WIFs);
```

#### bufferFromHex
Function for getting Buffer from Hex.

##### Args
* hex

##### Usage
```javascript
let buffer = msint.bufferFromHex(hex);
```

### Wallet
**Wallet** - module for interacting with the wallet, containing the following functions:

#### create
Function for creating an address.

##### Usage
```javascript
import { bitcoin } from 'crypto-interaction';
let NETWORK = bitcoin.networks.testnet

const wallet = new bitcoin.Wallet(NETWORK, keyPairs);
const address = wallet.create();
```

#### getInfo
Function for getting information about the wallet.

##### Usage
```javascript
const Info = wallet.getInfo();

const address = info.address;
const redeem = info.redeem;
const WIFs = info.WIFs;
const pubKeys = info.pubKeys;
```
### Transaction
**Transaction** - module for creating and interacting with transactions, which includes the following functions:

#### create
Function for creating a transaction.

##### Usage
```javascript
import { bitcoin } from 'crypto-interaction';
let NETWORK = bitcoin.networks.testnet;

const tx = new bitcoin.Transaction(NETWORK).create();
```

#### addInput
Function for adding input to a transaction.

##### Args
* hash - hash of the previous transaction
* script - script pub key
* balance

##### Usage
```javascript
tx.addInput(hash, script, balance);
```

#### addOutput
Function for adding output to a transaction.

##### Args
* recipient - recipient address
* balance
* fee - transaction fee

##### Usage
```javascript
tx.addOutput(recipient, balance, fee);
```

#### sign
Function for signing a transaction.

##### Args
* WIF

##### Usage
```javascript
tx.sign(key1);
tx.sign(key2);
```

#### broadcast
Function publishes the transaction to the blockchain.

##### Usage
```javascript
tx.broadcast()
```

### NodeInt
**NodeInt** - module for interacting with the bitcoin blockchain via the fetch API, includes the following functions:

#### getHash
Function for getting the hash of the previous transaction.

##### Args
* address

##### Usage
```javascript
const API = 'https://api.blockcypher.com/v1/btc/test3'
const address = wallet.create();

let input = new bitcoin.NodeInt(API);
let hash = await input.getHash(address);
```

#### getScriptPubKey
Function for getting the script public key.

##### Args
* address

##### Usage
```javascript
let script = await input.getScriptPubKey(address)
```

#### getBalance
Function for getting the address balance.

##### Args
* address

##### Usage
```javascript
let balance = await input.getBalance(address);
```