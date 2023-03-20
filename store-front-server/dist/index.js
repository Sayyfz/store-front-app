"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const constants_1 = require("./constants/constants");
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use('/images', express_1.default.static(constants_1.productsPath));
app.use('/api', (req, res, next) => {
    console.log('middleware');
    next();
});
app.use('/api', indexRoute_1.default);
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
exports.default = app;
