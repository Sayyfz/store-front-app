"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const usersRoute_1 = __importDefault(require("../src/routes/usersRoute"));
const productsRoute_1 = __importDefault(require("../src/routes/productsRoute"));
const ordersRoute_1 = __importDefault(require("../src/routes/ordersRoute"));
const dashboardRoute_1 = __importDefault(require("../src/routes/dashboardRoute"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use('/users', usersRoute_1.default);
app.use('/products', productsRoute_1.default);
app.use('/orders', ordersRoute_1.default);
app.use('/services', dashboardRoute_1.default);
app.get('/', function (req, res) {
    res.send('Welcome, you can check for the endpoints in the README.md file');
});
app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
exports.default = app;
