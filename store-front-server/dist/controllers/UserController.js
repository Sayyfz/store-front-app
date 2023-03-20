"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Helpers_1 = require("../utils/Helpers");
class UserController {
    constructor(repository) {
        this.index = async (req, res, next) => {
            const users = await this.repository.index();
            return res.status(200).json(users);
        };
        this.show = async (req, res, next) => {
            const user = await this.repository.show(req.params.id);
            return res.status(200).json(user);
        };
        this.create = async (req, res, next) => {
            const user = {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                username: req.body.username,
                password: req.body.password,
            };
            try {
                const newUser = await this.repository.create(user);
                const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
                return res.status(201).json(token);
            }
            catch (err) {
                (0, Helpers_1.checkErrorAndNext)(err, 'User', next);
            }
        };
        this.update = async (req, res, next) => {
            const user = {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                username: req.body.username,
                password: req.body.password,
            };
            try {
                const newUser = await this.repository.update(req.params.id, user);
                return res.status(200).json(newUser);
            }
            catch (err) {
                (0, Helpers_1.checkErrorAndNext)(err, 'User', next);
            }
        };
        this.delete = async (req, res, next) => {
            const user = await this.repository.delete(req.params.id);
            return res.status(200).json(user);
        };
        this.authenticate = async (req, res, next) => {
            const user = await this.repository.authenticate(req.body.username, req.body.password);
            const token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
            return res.status(200).json(token);
        };
        this.repository = repository;
    }
}
exports.default = new UserController(UserRepository_1.default);
