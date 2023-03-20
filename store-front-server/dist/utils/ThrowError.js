"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwValidationError = exports.throwBadRequestError = exports.throwErrorOnNotFound = void 0;
const BadRequestError_1 = __importDefault(require("./BadRequestError"));
const NotFoundError_1 = __importDefault(require("./NotFoundError"));
const ValidationError_1 = __importDefault(require("./ValidationError"));
const throwErrorOnNotFound = (result, entity, message) => {
    if (!result?.rows?.length) {
        const msg = message ?? `Cannot find ${entity}`;
        throw new NotFoundError_1.default(msg);
    }
};
exports.throwErrorOnNotFound = throwErrorOnNotFound;
const throwBadRequestError = (message) => {
    throw new BadRequestError_1.default(message);
};
exports.throwBadRequestError = throwBadRequestError;
const throwValidationError = (message, property) => {
    throw new ValidationError_1.default(message, property);
};
exports.throwValidationError = throwValidationError;
