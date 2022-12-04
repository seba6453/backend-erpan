import {User} from "../types/user_types";

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
export const createToken = (user: User | undefined) => {
    if (user != undefined) {
        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_PRIVATE_KEY, {expiresIn: '24h'});
        return token
    }
    return undefined
}

/**
 * It takes a token, decodes it, and returns the decoded data.
 * @param {string | undefined} token - The token to decode
 * @returns The decoded token.
 */
export const decodeToken = (token: string | undefined) => {
    const data = jwt.decode(token, process.env.JWT_PRIVATE_KEY);
    return data;
};

export const verifyToken = async (token: string) => {
    try {
        await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return true
      } catch(err) {
        // err
        console.error(err);
        return false
      }
}
