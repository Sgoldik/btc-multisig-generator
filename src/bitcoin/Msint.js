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
exports.Msint = void 0;
const bitcoinjs = __importStar(require("bitcoinjs-lib"));
class Msint {
    constructor(network) {
        this.NETSYDE = "tb1qxs488h7tmk5w6axeht5zvgwts8w48s2fhge4yskmv8pskdplsdesquf922";
        this.NETWORK = network;
    }
    getRedeemScript(pubKeys) {
        const redeem = bitcoinjs.payments.p2ms({
            m: 2,
            pubkeys: pubKeys,
            network: this.NETWORK
        });
        //console.log(redeem)
        return redeem;
    }
    keyPairFromWIF(WIF) {
        return bitcoinjs.ECPair.fromWIF(WIF, this.NETWORK);
    }
    keyPairsFromWIFs(WIFs) {
        return WIFs.map((wif) => this.keyPairFromWIF(wif));
    }
    generateKeyPair() {
        return bitcoinjs.ECPair.makeRandom({ network: this.NETWORK });
    }
    generateKeyPairs() {
        try {
            const keyPairs = [this.generateKeyPair(), this.generateKeyPair(), this.generateKeyPair()];
            return keyPairs;
        }
        catch (e) {
            console.log(e);
            return false;
        }
    }
    bufferFromHex(hex) {
        return Buffer.from(hex, 'hex');
    }
    pubKeyFromKeyPair(keyPair) {
        return keyPair.publicKey;
    }
    pubKeysFromKeyPairs(keyPairs) {
        return keyPairs.map((keyPair) => this.pubKeyFromKeyPair(keyPair));
    }
}
exports.Msint = Msint;
//# sourceMappingURL=Msint.js.map