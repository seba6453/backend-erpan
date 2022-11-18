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
exports.searchProvider = exports.deleteProvider = exports.getProvider = exports.updateProvider = exports.addProvider = exports.getAll = void 0;
const dataBase_1 = require("../dataBase");
const getAll = (id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from providers p where p.id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    const allProvider = result.rows;
    return allProvider;
});
exports.getAll = getAll;
const addProvider = (newProvider) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `insert into providers(name_providers,id_business) values(upper('${newProvider.name_providers}'),${newProvider.id_business})`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.addProvider = addProvider;
const updateProvider = (id, updateProvider, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `update providers set name_providers = upper('${updateProvider.name_providers}') where name_providers = upper('${id}') and id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updateProvider = updateProvider;
const getProvider = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from providers p where p.id_business = ${id_business} and p.name_providers = upper('${id}')`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount >= 1) {
        const provider = result.rows[0];
        return provider;
    }
    return undefined;
});
exports.getProvider = getProvider;
const deleteProvider = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM providers WHERE name_providers = upper('${id}') and id_business=${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteProvider = deleteProvider;
const searchProvider = (palabra, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from providers WHERE name_providers like upper('%${palabra}%') and id_business=${id_business}`;
    const result = yield dataBase_1.client.query(query);
    const providers = result.rows;
    return providers;
});
exports.searchProvider = searchProvider;
