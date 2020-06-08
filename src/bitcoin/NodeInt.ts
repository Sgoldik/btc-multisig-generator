const axios = require('axios');

export default class NodeInt {
    API: string

    constructor (API: string) {
        this.API = API
    }

    async getHash (address: string) { // hash = prev tx id
        const response = await axios.get(`${this.API}/addrs/${address}`);
        return response.data.txrefs[0].tx_hash;
    }

    async getScriptPubKey (address: string) {
        const hash = await this.getHash(address);
        const response = await axios.get(`${this.API}/txs/${hash}?includeHex=true`);
        return response.data.outputs[0].script;
    }

    async getBalance (address: string) {
        const response = await axios.get(`${this.API}/addrs/${address}`);
        return response.data.balance;
    }

    async getTxInfo (tx: string) {
        const response = await axios.get(`${this.API}/txs/${tx}?includeHex=true`);
        return response.data;
    }
}

module.exports.NodeInt = NodeInt;