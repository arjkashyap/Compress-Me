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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTextRouter = void 0;
const express_1 = __importDefault(require("express"));
const Decoder_1 = require("../../utils/Decoder");
const app_1 = require("../../app");
const HandleBuffer_1 = require("../../utils/HandleBuffer");
const HandleDictonary_1 = require("../../utils/HandleDictonary");
exports.decodeTextRouter = express_1.default.Router();
/*
"text": [777806, 2144547616, 65535]

"dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111"],["e", "1"]]

   // "dict": [["c","00"],[" ","010"],[ "d", "0110"],["a","01110"],["b","01111",["e", "1"]]
    // "dict": [["c", "00"]]
*/
exports.decodeTextRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let compressedTxt = yield HandleBuffer_1.readBufferFile(app_1.bufferUpload);
    const dict = HandleDictonary_1.convertJsonToMap();
    const decodedText = Decoder_1.decodeText(compressedTxt, dict);
    const response = {
        status: 200,
        text: decodedText,
    };
    return res.status(200).json(response);
}));
// Route for uploading buffer file during compression
exports.decodeTextRouter.post("/upload-buffer", (req, res) => {
    if (req.files) {
        console.log(req.files);
        const file = req.files.myFile;
        file.mv("./src/routes/api/uploads" + "/compressed-upload", (err) => {
            if (err) {
                console.log(err);
                return res.send("error occured");
            }
            return res.status(200).send("done");
        });
    }
});
// route for uploading json file
exports.decodeTextRouter.post("/upload-json", (req, res) => {
    console.log("Json file recieved");
    if (req.files) {
        console.log(req.files);
        const file = req.files.myFile;
        file.mv("./src/routes/api/uploads" + "/compressed-dict.json", (err) => {
            if (err) {
                console.log(err);
                return res.send("error occured");
            }
            return res.status(200).send("done");
        });
    }
});
//# sourceMappingURL=decode-text.js.map