"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoinjs = __importStar(require("bitcoinjs-lib"));
const Msint_1 = require("./Msint");
class Wallet extends Msint_1.Msint {
    constructor(network, keyPairs) {
        super(network);
        this.network = network;
        this.keyPairs = keyPairs;
        this.pubKeys = this.pubKeysFromKeyPairs(this.keyPairs);
    }
    create() {
        const redeem = this.getRedeemScript(this.pubKeys);
        const { address } = bitcoinjs.payments.p2wsh({
            redeem: redeem,
            network: this.network
        });
        return address;
    }
    getInfo() {
        try {
            return {
                address: this.create(),
                redeem: this.getRedeemScript(this.pubKeys).output.toString('hex'),
                WIFs: this.keyPairs.map((keyPair) => keyPair.toWIF()),
                pubKeys: this.keyPairs.map((keyPair) => keyPair.publicKey.toString('hex')),
            };
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
}
exports.default = Wallet;
//# sourceMappingURL=Wallet.js.map