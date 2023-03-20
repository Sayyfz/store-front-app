"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("../utils/CustomError"));
const errorHandler = async (err, _req, res, next) => {
    if (err instanceof CustomError_1.default) {
        return res.status(err.errorCode).json({ errors: err.serializeErrors() });
    }
    return res.status(400).json({ errors: err.message });
};
exports.default = errorHandler;
