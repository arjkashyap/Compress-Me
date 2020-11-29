"use strict";
// Route for text compression
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orignalTex = exports.encodeTextRouter = void 0;
const express_1 = __importDefault(require("express"));
const FrequencyMap_1 = require("../../utils/FrequencyMap");
const MinHeap_1 = __importStar(require("../../utils/MinHeap"));
const HMT_1 = __importDefault(require("../../utils/HMT"));
const Encoder_1 = require("../../utils/Encoder");
const path = __importStar(require("path"));
const HandleBuffer_1 = require("../../utils/HandleBuffer");
const HandleDictonary_1 = require("../../utils/HandleDictonary");
exports.encodeTextRouter = express_1.default.Router();
// @post
// Compress string
exports.encodeTextRouter.post("/", (req, res) => {
    const text = req.body.compressionString; // Text to be compressed
    exports.orignalTex = text;
    let responseMsg;
    if (text.length === 0) {
        responseMsg = {
            status: 400,
            msg: "Request Message cannot be empty string",
        };
        return res.status(400).json(responseMsg);
    }
    const mp = FrequencyMap_1.createFrequencyMap(text);
    const heap = new MinHeap_1.default(); // Creating a min heap for nodes
    // Push Frequency Nodes in the Min heap
    for (let e of mp.entries()) {
        const NodeObj = {
            nodeType: MinHeap_1.leafNode,
            char: e[0],
            freq: e[1],
        };
        const heapNode = new MinHeap_1.HeapNode(NodeObj);
        heap.push(heapNode);
    }
    // Create HMT from the heap of the request text
    const hmt = new HMT_1.default(text, heap);
    const dict = hmt.getDict(); // dictonary
    hmt.display();
    const encodedArray = Encoder_1.textEncode(text, dict);
    Encoder_1.readBits(encodedArray);
    const orignalTextSize = text.length;
    const encodedTextSize = encodedArray.length * 4;
    console.log(`Size of orignal text: ${orignalTextSize} bytes. Size of Encoded text: ${encodedTextSize} bytes.`);
    const compressionPercent = ((encodedArray.length * 4) / text.length) * 100;
    const eff = ((text.length - encodedArray.length * 4) / text.length) * 100;
    console.log(`Text compressed by ${eff.toFixed(3)} %`);
    console.log("Size of dictionary is : ", hmt.dictSize(), " bytes");
    const response = {
        status: 200,
        orignalSize: orignalTextSize,
        textSize: encodedTextSize,
        eff: eff,
    };
    // create buffer file
    HandleBuffer_1.createeBufferFile(encodedArray);
    HandleDictonary_1.createDictJson(dict);
    const resultFile = path.join(__dirname, "tmp", "result.txt");
    return res.status(200).json(response);
});
//# sourceMappingURL=encode-text.js.map