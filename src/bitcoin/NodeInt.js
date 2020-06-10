"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            return response.data.txrefs[0].tx_hash;
        });
    }
    getScriptPubKey(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield this.getHash(address);
            const response = yield axios.get(`${this.API}/txs/${hash}?includeHex=true`);
            return response.data.outputs[0].script;
        });
    }
    getBalance(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`${this.API}/addrs/${address}`);
            return response.data.balance;
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
}
exports.default = NodeInt;
module.exports.NodeInt = NodeInt;
//# sourceMappingURL=NodeInt.js.map