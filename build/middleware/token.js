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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.decodeToken = exports.createToken = void 0;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
/**
 * It takes a user object and returns a token
 * @param {User} user - User - the user object that is passed in from the login function
 * @returns A token
 */
const createToken = (user) => {
    if (user != undefined) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_PRIVATE_KEY, { expiresIn: '24h' });
        return token;
    }
    return undefined;
};
exports.createToken = createToken;
/**
 * It takes a token, decodes it, and returns the decoded data.
 * @param {string | undefined} token - The token to decode
 * @returns The decoded token.
 */
const decodeToken = (token) => {
    const data = jwt.decode(token, process.env.JWT_PRIVATE_KEY);
    return data;
};
exports.decodeToken = decodeToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(yield jwt.verify(token, process.env.JWT_PRIVATE_KEY));
        return true;
    }
    catch (err) {
        // err
        console.error(err);
        return false;
    }
});
exports.verifyToken = verifyToken;
