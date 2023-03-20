"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomError_1 = __importDefault(require("./CustomError"));
class NotFoundError extends CustomError_1.default {
    constructor(message) {
        super(message);
        this.errorCode = 404;
        this.errorType = 'NOT_FOUND_ERROR';
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message }];
    }
}
exports.default = NotFoundError;
