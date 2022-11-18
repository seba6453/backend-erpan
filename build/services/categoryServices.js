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
exports.searchCategory = exports.deleteCategory = exports.getCategory = exports.updateCategory = exports.addCategory = exports.getAll = void 0;
const dataBase_1 = require("../dataBase");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from categories`;
    const result = yield dataBase_1.client.query(query);
    const allCategories = result.rows;
    return allCategories;
});
exports.getAll = getAll;
const addCategory = (newCategory) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `insert into categories(name_categories) values(upper('${newCategory.name_categories}'))`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.addCategory = addCategory;
const updateCategory = (id, categoryUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `update categories set name_categories = upper('${categoryUpdate.name_categories}') where name_categories = upper('${id}')`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updateCategory = updateCategory;
const getCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from categories where name_categories = upper('${id}')`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount >= 1) {
        const category = result.rows[0];
        return category;
    }
    return undefined;
});
exports.getCategory = getCategory;
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `delete from categories where name_categories = upper('${id}')`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteCategory = deleteCategory;
const searchCategory = (palabra) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from categories WHERE name_categories like upper('%${palabra}%')`;
    const result = yield dataBase_1.client.query(query);
    const providers = result.rows;
    return providers;
});
exports.searchCategory = searchCategory;
