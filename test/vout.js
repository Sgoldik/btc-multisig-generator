const { bitcoin, etherium } = require('../src');
const bitcoinjs = require ('bitcoinjs-lib');

const API = 'https://api.blockcypher.com/v1/btc/test3'

const vout = async () => {
    let address = 'tb1q6facue04fhsag9mj9tjqj0msvt0s83x33k48aaap0z0nzafg7naskkt78d';
    let txID = '78354400167fafa4d1e10e7d30bfe98ca038e35942dc7df403af6d11781ea584';
    
    let input = new bitcoin.NodeInt(API)
    let vout = await input.getVout(txID, address);
    console.log(vout)
}

vout()