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
exports.encodeTextRouter = void 0;
const express_1 = __importDefault(require("express"));
const FrequencyMap_1 = require("../../utils/FrequencyMap");
const MinHeap_1 = __importStar(require("../../utils/MinHeap"));
const HMT_1 = __importDefault(require("../../utils/HMT"));
const Encoder_1 = require("../../utils/Encoder");
exports.encodeTextRouter = express_1.default.Router();
// @get
// renders client service
exports.encodeTextRouter.get("/", (req, res) => {
    console.log("Get Request on text compression");
    const responseMsg = {
        status: 200,
        msg: "Get Request recieved. Now what ?",
    };
    res.json(responseMsg);
});
// @post
// Compress string
exports.encodeTextRouter.post("/", (req, res) => {
    const text = req.body.compressionString; // Text to be compressed
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
    const response = {
        status: 200,
        text: encodedArray,
        dict: Array.from(dict),
    };
    return res.status(200).json(response);
});
//# sourceMappingURL=encode-text.js.map