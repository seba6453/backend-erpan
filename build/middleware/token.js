"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.createToken = void 0;
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
