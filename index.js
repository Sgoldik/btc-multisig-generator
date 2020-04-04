const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet

const keyPair1 = bitcoin.ECPair.makeRandom({ network: TESTNET });
const keyPair2 = bitcoin.ECPair.makeRandom({ network: TESTNET });
const keyPair3 = bitcoin.ECPair.makeRandom({ network: TESTNET });

let pubKeysRand = []
pubKeysRand.push(keyPair1.publicKey)
pubKeysRand.push(keyPair2.publicKey)
pubKeysRand.push(keyPair3.publicKey)

var keyPairs = [
    'cRDdesRK3so8WpuBHQa9vf29cFxCh7jk3q5sVean3moVZgswfHTz',
    'cRXdkeZcarZNbvn2NsZzJA6XRbp9ePMS2NbhQLL5gqJApkejnzBU',
    'cP2i8Jzrn9w4q9wuDEAKyncktkK6V3WtNcyzRJFHu14kgEJDnt5d'
].map(wif => bitcoin.ECPair.fromWIF(wif, TESTNET))

var pubKeys = [
    '03de6d9b8cb72bbdfa7f86a8ff3951ad73584c40bc88625cf1a5d6e1a83b595564',
    '02c1f15417264e351325ac9cc2de70028525545270b58093f40bd5f0e7560f8562',
    '035b92c04584bf80d417d4fc5ee056b587aad97ee09dfddc9a662f5d4499bb4b49'
].map(hex => Buffer.from(hex, 'hex'));

let createMultiSig = (pubKeys) => {
    const redeem = bitcoin.payments.p2ms(
        {
            m: 2,
            pubkeys: pubKeys,
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
}

let showKey = (txt, keyPair) => {
    console.log(txt, 'private key in WIF:', keyPair.toWIF(), 'public key in hex:', keyPair.publicKey.toString('hex'));
}

createMultiSig(pubKeysRand)

let transValue = 10;

let sendTransaction = async () => {
    let mixin2;
    mixin2.witnessScript = payment.redeem.redeem.output;
    mixin2.redeemScript = payment.redeem.output;
    const inputData = {
        hash: "b8a8e633e226ff0564cdeb231179f6354e484c28b4c90a6f867dcf252320d862",
        vout: 0,
        ...null,
        ...mixin2,
    }
    const psbt = new bitcoin.Psbt({ network: TESTNET })
        .addInput(inputData)
        .addOutput({
            address: "2NBL8TSiFViSfVv4CbJRnH3tdUDeUM9gi4R",
            value: 100,
        })
        .signInput(0, keyPairs[0])
        .signInput(0, keyPairs[1])
}

function getWitnessUtxo(out) {
    delete out.address;
    out.script = Buffer.from(out.script, 'hex');
    return out;
}