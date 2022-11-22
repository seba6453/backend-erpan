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
exports.verifyStock = exports.searchProduct = exports.deleteProduct = exports.updateProduct = exports.getProductBarcode = exports.getProduct = exports.addProduct = exports.getAll = void 0;
const dataBase_1 = require("../dataBase");
const categoryServices_1 = require("./categoryServices");
const providerServices_1 = require("./providerServices");
/**
 * If the provider doesn't exist, create it.
 * @param {NewProduct | Product} product - NewProduct | Product
 */
const verifyProvier = (product) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield (0, providerServices_1.getProvider)(product.id_providers, product.id_business)) === undefined) {
        const newProvider = {
            id_business: product.id_business,
            name_providers: product.id_providers
        };
        yield (0, providerServices_1.addProvider)(newProvider);
    }
});
/**
 * If the category doesn't exist, create it.
 * @param {NewProduct | Product} product - NewProduct | Product
 */
const verifyCategories = (product) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield (0, categoryServices_1.getCategory)(product.id_categories)) === undefined) {
        const newCategory = {
            name_categories: product.id_categories
        };
        yield (0, categoryServices_1.addCategory)(newCategory);
    }
});
const getAll = (id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM products pr where id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    const allProducts = result.rows;
    return allProducts;
});
exports.getAll = getAll;
const addProduct = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    yield verifyCategories(newProduct);
    yield verifyProvier(newProduct);
    const query = `INSERT INTO products (id_business,id_categories,id_providers,bar_code,stock,name_product,price,cost) VALUES(${newProduct.id_business},'${newProduct.id_categories.toUpperCase()}','${newProduct.id_providers.toUpperCase()}',${newProduct.bar_code},${newProduct.stock},'${newProduct.name_product.toLowerCase()}',${newProduct.price},${newProduct.cost});`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    }
    catch (err) {
        console.error(err);
        return false;
    }
});
exports.addProduct = addProduct;
const getProduct = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from products pr where id = ${id} and id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount >= 1) {
        const product = result.rows[0];
        return product;
    }
    return undefined;
});
exports.getProduct = getProduct;
const getProductBarcode = (barcode, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from products pr where bar_code = ${barcode} and id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount >= 1) {
        const product = result.rows[0];
        return product;
    }
    return undefined;
});
exports.getProductBarcode = getProductBarcode;
const updateProduct = (id, updateProduct, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `UPDATE public.products SET name_product='${updateProduct.name_product.toLowerCase()}',id_categories = upper('${updateProduct.id_categories}'),id_providers = upper('${updateProduct.id_providers}'),bar_code=${updateProduct.bar_code},price=${updateProduct.price},stock=${updateProduct.stock} WHERE id=${id} and id_business=${id_business};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.updateProduct = updateProduct;
const deleteProduct = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM products WHERE id=${id} and id_business=${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteProduct = deleteProduct;
const searchProduct = (palabra, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from products pr where pr.id_business = ${id_business} and pr.id_categories like upper('%${palabra}%') or pr.id_providers like upper('%${palabra}%') or pr.name_product like lower('%${palabra}%');`;
    const result = yield dataBase_1.client.query(query);
    const products = result.rows;
    return products;
});
exports.searchProduct = searchProduct;
const verifyStock = (id, count, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from products pr where id = ${id} and id_business = ${id_business};`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const product = result.rows[0];
        if (product.stock - count >= 0) {
            return true;
        }
    }
    return false;
});
exports.verifyStock = verifyStock;
