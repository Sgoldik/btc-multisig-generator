const axios = require('axios');

export default class NodeInt {
    API: string

    constructor (API: string) {
        this.API = API
    }

    async getHash (address: string) { // hash = prev tx id
        const response = await axios.get(`${this.API}/addrs/${address}`);
        //console.log(response.data)
        return response.data.txrefs[0].tx_hash;
    }

    async getScriptPubKey (address: string, hash: string) {
        const response = await axios.get(`${this.API}/txs/${hash}?includeHex=true`);
        const output = response.data.outputs.filter ((output: any) =>
            output.addresses[0] == address
        )
        return output[0].script;
    }

    async getBalance (address: string) {
        const response = await axios.get(`${this.API}/addrs/${address}`);
        return response.data.balance;
    }

    async getInputBalance (address: string, hash: string) {
        const response = await axios.get(`${this.API}/txs/${hash}?includeHex=true`);
        const output = response.data.outputs.filter ((output: any) =>
            output.addresses[0] == address
        )
        return output[0].value;
    }

    async getInputData (address: string, hash: string) {
        const response = await axios.get(`${this.API}/txs/${hash}?includeHex=true`);
        const output = response.data.outputs.filter ((output: any) =>
            output.addresses[0] == address
        )
        return {
            value: output[0].value,
            script: output[0].script
        }
    }

    async getTxInfo (tx: string) {
        const response = await axios.get(`${this.API}/txs/${tx}?includeHex=true`);
        return response.data;
    }
    
    async getTxAddresses (tx: string): Promise<Array<string>> {
        const response = await this.getTxInfo(tx);
        return response.data.outputs.map ((output: any) =>
            output.addresses
        )
        
    }

    async getTxOutputsWithBalance (tx: string) {
        const info = await this.getTxInfo(tx)
        return info.outputs.map ((output: any) => {
               return {
                   address: output.addresses ? output.addresses[0] : output.addresses,
                   value: output.value
               }
            }
        )
    }

    async getVout (tx: string, address: string) {
        try {
            const response = await axios.get(`${this.API}/txs/${tx}`);
            for (let i = 0; i < response.data.outputs.length; i++) {
                if (response.data.outputs[i].addresses[0] == address) {
                    return i;
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getAllInputsHashes (address: string) {
        const response = await axios.get(`${this.API}/addrs/${address}`);
        //console.log(response.data)
        // console.log(response.data.txrefs)
        const txrefs = response.data.txrefs.filter ((txref: any) => 
            // txref.tx_input_n == -1 && txref.tx_output_n == 1 && txref.spent == false
            txref.spent == false
        )
        console.log(txrefs)
        const hashes = txrefs.map((txref: any) => 
            txref.tx_hash
        )

        return hashes;

    }

}

module.exports.NodeInt = NodeInt;