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