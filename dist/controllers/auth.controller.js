"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Crea un usuario con la interfaz del modelo
    const user = new user_1.default({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.password = yield user.encryptPassword(user.password);
    const savedUser = yield user.save();
    // token
    const token = jsonwebtoken_1.default.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET || 'why', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(savedUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate User
    const user = yield user_1.default.findOne({ email: req.body.email });
    if (!user)
        return res.status(404).json('Email or password wrong');
    // Validate password
    const passwordMatch = yield user.validatePassword(req.body.password);
    if (!passwordMatch)
        return res.status(400).json('Invalid Password');
    // If validation create log in token
    const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.TOKEN_SECRET || 'why', {
        expiresIn: 60 * 60 * 24
    });
    res.header('auth-token', token).json(user);
});
exports.signIn = signIn;
const profile = (req, res) => {
    res.send('SignUp');
};
exports.profile = profile;
//# sourceMappingURL=auth.controller.js.map