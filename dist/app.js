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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bufferCompressedDict = exports.bufferUpload = exports.bufferCompressed = void 0;
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const bodyParser = __importStar(require("body-parser"));
const encode_text_1 = require("./routes/api/encode-text");
const decode_text_1 = require("./routes/api/decode-text");
const upload = require("express-fileupload");
const app = express_1.default();
const PORT = process.env.PORT || 5000;
exports.bufferCompressed = path.join(__dirname, "utils", "buffer-store", "compressed-out");
// Compresse file uploaded by the user during decompress request
exports.bufferUpload = path.join(__dirname, "routes", "api", "uploads", "compressed-upload");
// Dictonary json file for the compressed output
exports.bufferCompressedDict = path.join(__dirname, "utils", "dict", "compressed-out-dict.json");
app.use(upload());
app.use(bodyParser.json());
app.use(express_1.default.static(__dirname + "/client"));
// locahsot:500/
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
});
// Download compressed file
app.get("/download-compressed", (req, res) => {
    res.download(exports.bufferCompressed);
});
// Download dictonary json
app.get("/download-dict", (req, res) => {
    res.download(exports.bufferCompressedDict);
});
// API Routes
app.use("/api/encode-text", encode_text_1.encodeTextRouter);
app.use("/api/decode-text", decode_text_1.decodeTextRouter);
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
//# sourceMappingURL=app.js.map