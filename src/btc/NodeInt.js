const axios = require('axios');

class NodeInt {
    constructor (address, API) {
        this.address = address;
        this.API = API
    }

    async getHash () { // hash = prev tx id
        const response = await axios.get(`${this.API}/addrs/${this.address}`);
        return response.data.txrefs[0].tx_hash;
    }

    async getScriptPubKey () {
        const hash = await this.getHash(this.address);
        const response = await axios.get(`${this.API}/txs/${hash}?includeHex=true`);
        return response.data.outputs[0].script;
    }

    async getBalance () {
        const response = await axios.get(`${this.API}/addrs/${this.address}`);
        return response.data.balance;
    }
}

module.exports.NodeInt = NodeInt;