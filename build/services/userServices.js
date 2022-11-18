"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.createUser = exports.getUser = void 0;
const dataBase_1 = require("../dataBase");
const bcrypt = require('bcryptjs');
/**
 * @param userLogin usuario que se esta iniciando sesion
 * @return {userData} datos del usuario
 */
const getUser = (userLogin) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM business WHERE email = '${userLogin.email}'`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const userData = yield result.rows[0];
        const validPassword = yield bcrypt.compare(userLogin.password, userData.passw);
        if (validPassword) {
            return userData;
        }
    }
    return undefined;
});
exports.getUser = getUser;
/**
 *
 * @param newUser nuevo usuario que se esta registrando al sistema
 * @returns boolean
 */
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordEncript = yield bcrypt.hash(newUser.password, 10);
    const query = `insert into business(name_business,email,passw,short_name) values('${newUser.name_business}','${newUser.email}','${passwordEncript}','${newUser.short_name}');`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
});
exports.createUser = createUser;
