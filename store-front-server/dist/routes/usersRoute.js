"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const verifyToken_1 = require("../middlewares/verifyToken");
require("express-async-errors");
const usersRoute = express_1.default.Router();
usersRoute.get('/', UserController_1.default.index);
usersRoute.post('/', UserController_1.default.create);
usersRoute.get('/:id', verifyToken_1.verifyToken, UserController_1.default.show);
usersRoute.delete('/:id', verifyToken_1.verifyToken, UserController_1.default.delete);
usersRoute.patch('/:id', verifyToken_1.verifyToken, UserController_1.default.update);
usersRoute.post('/authenticate', UserController_1.default.authenticate);
exports.default = usersRoute;
