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
const mongoose_1 = require("mongoose");
const argon2_1 = __importDefault(require("argon2"));
;
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.methods.encryptPassword =
    (password) => __awaiter(void 0, void 0, void 0, function* () {
        const hash = yield argon2_1.default.hash(password);
        return hash;
    });
userSchema.methods.validatePassword =
    function (password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield argon2_1.default.verify(this.password, password);
        });
    };
exports.default = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map