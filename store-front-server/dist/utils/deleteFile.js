"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const fs_1 = __importDefault(require("fs"));
const NotFoundError_1 = __importDefault(require("./NotFoundError"));
const deleteFile = (filePath) => {
    if (!fs_1.default.existsSync(filePath)) {
        console.log(filePath);
        throw new NotFoundError_1.default('Product not found');
    }
    fs_1.default.unlink(filePath, err => {
        if (err) {
            throw err;
        }
    });
};
exports.deleteFile = deleteFile;
