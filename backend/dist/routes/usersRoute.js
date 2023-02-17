"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controllers/usersController");
const verifyToken_1 = require("../middlewares/verifyToken");
const usersRoute = express_1.default.Router();
usersRoute.get('/', verifyToken_1.verifyToken, usersController_1.index);
usersRoute.post('/', usersController_1.create);
usersRoute.get('/:id', verifyToken_1.verifyToken, usersController_1.show);
usersRoute.post('/authenticate', usersController_1.authenticate);
exports.default = usersRoute;
