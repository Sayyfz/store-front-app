"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = exports.create = exports.show = exports.index = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new user_1.UserStore();
const index = async (req, res) => {
    try {
        const users = await store.index();
        return res.status(200).json(users);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.index = index;
const show = async (req, res) => {
    try {
        const user = await store.show(parseInt(req.params.id));
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.show = show;
const create = async (req, res) => {
    const user = {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        return res.status(201).json(token);
    }
    catch (err) {
        return res.status(400).json(err.message);
    }
};
exports.create = create;
const authenticate = async (req, res) => {
    try {
        const user = await store.authenticate(req.body.username, req.body.password);
        const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        return res.status(200).json(token);
    }
    catch (err) {
        const error = err;
        console.log(error);
        if (error.status === 400) {
            return res.status(400).json(error.err);
        }
        else if (error.status === 401) {
            return res.status(401).json(error.err);
        }
    }
};
exports.authenticate = authenticate;
