"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkErrorAndNext = void 0;
const ValidationError_1 = __importDefault(require("./ValidationError"));
const BadRequestError_1 = __importDefault(require("./BadRequestError"));
const checkErrorAndNext = (err, entity, next) => {
    if (err.code === '23505') {
        next(new ValidationError_1.default(`${entity} already exists`));
    }
    else {
        next(new BadRequestError_1.default(err.message));
    }
};
exports.checkErrorAndNext = checkErrorAndNext;
