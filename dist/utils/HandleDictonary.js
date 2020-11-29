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
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsonToMap = exports.createDictJson = void 0;
const fs = __importStar(require("fs"));
const app_1 = require("../app");
const jsonDict = __importStar(require("../routes/api/uploads/compressed-dict.json"));
// interface dictObjec = {
// }
// const dictPath = path.join(__dirname, "dict", "compressed-out-dict.json");
// read uploaded json file and return a map
function createDictJson(mp) {
    const jsonObject = {};
    mp.forEach((value, key) => {
        // value = jsonObject[key];
        jsonObject[key] = value;
    });
    const data = JSON.stringify(jsonObject);
    fs.writeFileSync(app_1.bufferCompressedDict, data);
}
exports.createDictJson = createDictJson;
// Function converts the uploaded json dictonary to map
function convertJsonToMap() {
    const dict = new Map(Object.entries(jsonDict));
    return dict;
}
exports.convertJsonToMap = convertJsonToMap;
//# sourceMappingURL=HandleDictonary.js.map