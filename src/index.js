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
    'cTwFJAR4PKvCjmga2KtX5tMihTcCaW7hDCgBGv9WL6cKe2rBSXJr',
    'cTaSE3oWy2dWUb3XeKG1JH9cWvUJyP6kYKctLgVEJ9GMdYLEpPgC',
    'cP9WqffsyhmmxcXUBA5LiGQvebVYTJgzqJiFJAPMKgJ919Z9iKww'
].map(wif => bitcoin.ECPair.fromWIF(wif, TESTNET))

let pubKeys = [
    '03553aba45337b3b517d0a462ec561301dea9ab23bb9893419ae5825bc29289fe9',
    '02a5e2155bee8aa081d633eca6104975e05e595010a71e37b9b45bbff66769a873',
    '021ae7ee977337a173c3be4acd674a52408c89a3bd74035614c2e52e5f6c08fe61'
].map(hex => Buffer.from(hex, 'hex'));

let getRedeemScript = (pubKeys, network) => {
    const redeem = bitcoin.payments.p2ms(
        {
            m: 2,
            pubkeys: pubKeys,
            network: network
        }
    );
    return redeem;
}

let showKey = (txt, keyPair) => {
    console.log(txt, 'private key in WIF:', keyPair.toWIF(), 'public key in hex:', keyPair.publicKey.toString('hex'));
}

let createMultiSig = (pubKeys, network) => {
    const redeem = getRedeemScript(pubKeys, network);
    const p2wsh = bitcoin.payments.p2wsh(
        {
            redeem: redeem,
            network: TESTNET
        }
    );
    console.log(p2wsh.redeem);
    console.log('redeem script:', redeem.output.toString('hex'));
    showKey('  key 1:', keyPair1);
    showKey('  key 2:', keyPair2);
    showKey('  key 3:', keyPair3);
}
let transValue = 30000;

let sendTransaction = (pubKeys, network) => {
    const inputData = {
        hash: "d21a2aa1b276f4b8b42d4049f3aeed88dde888d9fc114362134f7c6fb4e57447", // prev tx id
        index: 0,
        witnessUtxo: {
            script: Buffer.from(
                '0020f02e4e557ab47438ff82fba1e84c908f82c2b60578886d7ed9d80feeb195a218', // scriptPubkey 
                'hex',
            ),
            value: 1000000,
        },
        witnessScript: getRedeemScript(pubKeys, network).output, // A Buffer of the witnessScript for P2WSH
    }
    const psbt = new bitcoin.Psbt({ network: TESTNET })
        .addInput(inputData)
        .addOutput({
            address: "tb1q7qhyu4t6k36r3luzlws7snys37pv9ds90zyx6lkemq87avv45gvqm6hhzn",
            value: 900000,
        })
        .addOutput({
            address: "tb1q7qhyu4t6k36r3luzlws7snys37pv9ds90zyx6lkemq87avv45gvqm6hhzn",
            value: 10000,
        })
        .signInput(0, keyPairs[0])
        .signInput(0, keyPairs[2])
        .finalizeAllInputs();
        
    const tx = psbt.extractTransaction();

    console.log(tx.toHex())
}
sendTransaction(pubKeys, TESTNET)
