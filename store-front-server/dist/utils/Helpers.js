"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reformatProducts = exports.checkErrorAndNext = void 0;
const pg_protocol_1 = require("pg-protocol");
const ValidationError_1 = __importDefault(require("./ValidationError"));
const BadRequestError_1 = __importDefault(require("./BadRequestError"));
const checkErrorAndNext = (err, entity, next) => {
    if (err instanceof pg_protocol_1.DatabaseError) {
        console.log(err.detail);
        switch (err.code) {
            case '23505':
                next(new ValidationError_1.default(`${entity} already exists`));
                break;
            case '23503':
                next(new ValidationError_1.default(`Database reference error`));
                break;
            default:
                next(new BadRequestError_1.default('An unexpected database error occurred'));
        }
    }
    else {
        next(new BadRequestError_1.default(err.message));
    }
};
exports.checkErrorAndNext = checkErrorAndNext;
const reformatProducts = (rows) => {
    const products = {};
    rows.forEach(row => {
        const { id, name, price, category_id, image_id, image_url } = row;
        if (!products[id]) {
            products[id] = {
                id,
                name,
                price,
                category_id,
                images: [],
            };
        }
        if (image_id) {
            //@ts-ignore
            products[id].images.push({ id: image_id, imageUrl: image_url });
        }
    });
    return Object.values(products);
};
exports.reformatProducts = reformatProducts;
