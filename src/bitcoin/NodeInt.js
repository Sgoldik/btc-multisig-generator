"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
class NodeInt {
    constructor(API) {
        this.API = API;
    }
    getHash(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/addrs/${address}`);
            //console.log(response.data)
            return response.data.txrefs[0].tx_hash;
        });
    }
    getScriptPubKey(address, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/txs/${hash}?includeHex=true`);
            const output = response.data.outputs.filter((output) => output.addresses[0] == address);
            return output[0].script;
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/addrs/${address}`);
            return response.data.balance;
        });
    }
    getInputBalance(address, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/txs/${hash}?includeHex=true`);
            const output = response.data.outputs.filter((output) => output.addresses[0] == address);
            return output[0].value;
        });
    }
    getInputData(address, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/txs/${hash}?includeHex=true`);
            const output = response.data.outputs.filter((output) => output.addresses[0] == address);
            return {
                value: output[0].value,
                script: output[0].script
            };
        });
    }
    getTxInfo(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/txs/${tx}?includeHex=true`);
            return response.data;
        });
    }
    getTxAddresses(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.getTxInfo(tx);
            return response.data.outputs.map((output) => output.addresses);
        });
    }
    getTxOutputsWithBalance(tx) {
        return __awaiter(this, void 0, void 0, function* () {
            const info = yield this.getTxInfo(tx);
            return info.outputs.map((output) => {
                return {
                    address: output.addresses ? output.addresses[0] : output.addresses,
                    value: output.value
                };
            });
        });
    }
    getAllInputsHashes(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/addrs/${address}`);
            //console.log(response.data)
            // console.log(response.data.txrefs)
            const txrefs = response.data.txrefs.filter((txref) => txref.tx_input_n == -1 && txref.tx_output_n == 1);
            //console.log(txrefs)
            const hashes = txrefs.map((txref) => txref.tx_hash);
            return hashes;
        });
    }
}
exports.default = NodeInt;
module.exports.NodeInt = NodeInt;
//# sourceMappingURL=NodeInt.js.map