const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet

const keyPair1 = bitcoin.ECPair.makeRandom({ network: TESTNET });
const keyPair2 = bitcoin.ECPair.makeRandom({ network: TESTNET });
const keyPair3 = bitcoin.ECPair.makeRandom({ network: TESTNET });

let createMultiSig = (keyPair1, keyPair2, keyPair3) => {
    let pubkeys = [];
    pubkeys.push(keyPair1.publicKey);
    pubkeys.push(keyPair2.publicKey);
    pubkeys.push(keyPair3.publicKey);

    const redeem = bitcoin.payments.p2ms(
        {
            m: 2,
            pubkeys,
            network: TESTNET
        }
    );
    const p2sh = bitcoin.payments.p2sh(
        {
            redeem: redeem,
            network: TESTNET
        }
    );

    console.log(p2sh.address);
    console.log('redeem script:', redeem.output.toString('hex'));
    showKey('  key 1:', keyPair1);
    showKey('  key 2:', keyPair2);
    showKey('  key 3:', keyPair3);

    let showKey = (txt, keyPair) => {
        console.log(txt, 'private key in WIF:', keyPair.toWIF(), 'public key in hex:', keyPair.publicKey.toString('hex'));
    }

}

let sendTransaction = () => {

}