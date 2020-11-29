"use strict";
// Module for creating buffer output from encoded text array
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.readBufferFile = exports.createeBufferFile = void 0;
const fs = __importStar(require("fs"));
const app_1 = require("../app");
// create a buffer file from the 32 bit UnInt Array
function createeBufferFile(arr) {
    const n = arr.length;
    const uint32 = new Uint32Array(n);
    for (let i = 0; i < n; i++)
        uint32[i] = arr[i];
    // Create and write buffer file
    const buffer = uint32.buffer;
    fs.writeFileSync(app_1.bufferCompressed, Buffer.from(buffer));
}
exports.createeBufferFile = createeBufferFile;
function readBufferFile(path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, buff) => {
                let dataUint = new Uint32Array(buff.buffer, buff.byteOffset, buff.byteLength / 4);
                // const dataStandardArray: Array<number> = [];
                const restoredData = [];
                dataUint.forEach((e, i) => (restoredData[i] = e));
                if (err) {
                    reject(err);
                }
                resolve(restoredData);
            });
        });
    });
}
exports.readBufferFile = readBufferFile;
//# sourceMappingURL=HandleBuffer.js.map