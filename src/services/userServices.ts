import {client} from '../dataBase';
import {User, NewUser, UserLogin} from '../types/user_types';

const bcrypt = require('bcryptjs');

/**
 * @param userLogin usuario que se esta iniciando sesion
 * @return {userData} datos del usuario
 */
export const getUser = async (userLogin: UserLogin): Promise<User | undefined> => {
    const query = `SELECT * FROM business WHERE email = lower('${userLogin.email}')`;
    const result = await client.query(query)
    if (result.rowCount > 0) {
        const userData = await result.rows[0];
        const validPassword = await bcrypt.compare(userLogin.password, userData.passw);
        if (validPassword) {
            return userData;
        }
    }
    return undefined;
};

/**
 * It takes an email and password, queries the database for the email, and if the email exists, it
 * compares the password to the hashed password in the database.
 * @param {Number} email - Number,
 * @param {String} password - the password that the user entered
 * @returns A boolean value.
 */
export const verifyPasword = async (email: Number, password: String) => {
    const query = `select * from business where email = lower('${email}');`;
    const result = await client.query(query)
    if (result.rowCount > 0) {
        const userData = await result.rows[0];
        const validPassword = await bcrypt.compare(password, userData.passw);
        if (validPassword) {
            return true;
        }
    }
    return false;
}

export const existUser = async (email: String) => {
    const query = `SELECT * FROM business WHERE email = lower('${email}')`;
    const result = await client.query(query)
    if (result.rowCount > 0) {
        return true
    }
    return false;
};


/**
 * It takes an email and password, encrypts the password, and updates the database with the new
 * password
 * @param {string} email - string
 * @param {string} password - string
 * @returns A boolean value.
 */
export const updatePassword = async (email: string, password: string) => {
    const passwordEncript = await bcrypt.hash(password, 10)
    const query = `update business set passw = '${passwordEncript}' where email = lower('${email}')`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

/**
 *
 * @param newUser nuevo usuario que se esta registrando al sistema
 * @returns boolean
 */
export const createUser = async (newUser: NewUser) => {
    const passwordEncript = await bcrypt.hash(newUser.password, 10)
    const query = `insert into business(name_business,email,passw,short_name) values('${newUser.name_business}',lower('${newUser.email}'),'${passwordEncript}','${newUser.short_name}');`
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

/**
 * It deletes a user from the database based on the id passed to it
 * @param {Number | undefined} id - The id of the user to delete
 * @returns A boolean value.
 */
export const deleteUser = async (id: Number | undefined) => {
    const query = `DELETE FROM business WHERE id=${id}`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
}
    

