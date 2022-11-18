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
exports.existsTokenBlackList = exports.addBlackList = exports.existsToken = void 0;
const dataBase_1 = require("../dataBase");
const existsToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from token_business where token = '${token}'`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.existsToken = existsToken;
const addBlackList = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `INSERT INTO token_black_list(token_black) values ('${token}');`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.addBlackList = addBlackList;
const existsTokenBlackList = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from token_black_list where token_black = '${token}'`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.existsTokenBlackList = existsTokenBlackList;
