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
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
const productServices_1 = require("../services/productServices");
const token_1 = require("../middleware/token");
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
router.use(verifyToken_1.default);
/* This is a route that will be used to get all the products. */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dataToken = (0, token_1.decodeToken)((_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7));
    const products = yield (0, productServices_1.getAll)(dataToken.id);
    res.status(200).send(products);
}));
/* A route that will be used to add a new product. */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const dataToken = (0, token_1.decodeToken)((_b = req.get("Authorization")) === null || _b === void 0 ? void 0 : _b.substring(7));
    const { id_categories, id_providers, bar_code, stock, name_product, price, cost } = req.body;
    const newProduct = {
        id_business: dataToken.id,
        id_categories: id_categories,
        id_providers: id_providers,
        bar_code: bar_code,
        stock: stock,
        name_product: name_product,
        price: price,
        cost: cost
    };
    if (yield (0, productServices_1.addProduct)(newProduct)) {
        res.status(200).send(newProduct);
    }
    else {
        res.status(404).send({ "mensaje": "Error al agregar producto" });
    }
}));
/* This is a route that will be used to update a product by id. */
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const dataToken = (0, token_1.decodeToken)((_c = req.get("Authorization")) === null || _c === void 0 ? void 0 : _c.substring(7));
    const productUpdate = req.body;
    if (yield (0, productServices_1.updateProduct)(parseInt(req.params.id), productUpdate, dataToken.id)) {
        res.status(200).send(productUpdate);
    }
    else {
        res.status(404).send({ "mensaje": "Producto no actualizado" });
    }
}));
/* This is a route that will be used to get a product by id. */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const dataToken = (0, token_1.decodeToken)((_d = req.get("Authorization")) === null || _d === void 0 ? void 0 : _d.substring(7));
    const product = yield (0, productServices_1.getProduct)(parseInt(req.params.id), dataToken.id);
    if (product != undefined) {
        res.status(200).send(product);
    }
    else {
        res.status(404).send({ "mensaje": "producto no encontrado" });
    }
}));
/* A route that will be used to delete a product by id. */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const dataToken = (0, token_1.decodeToken)((_e = req.get("Authorization")) === null || _e === void 0 ? void 0 : _e.substring(7));
    if (yield (0, productServices_1.deleteProduct)(parseInt(req.params.id), dataToken.id)) {
        res.status(200).send(true);
    }
    else {
        res.status(404).send(false);
    }
}));
/* This is a route that will be used to search a product by name. */
router.get("/search/:search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const word = req.params.search.replace("+", " ");
    const dataToken = (0, token_1.decodeToken)((_f = req.get("Authorization")) === null || _f === void 0 ? void 0 : _f.substring(7));
    const products = yield (0, productServices_1.searchProduct)(word, dataToken.id);
    res.status(200).send(products);
}));
router.get("/barcode/:barcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    const dataToken = (0, token_1.decodeToken)((_g = req.get("Authorization")) === null || _g === void 0 ? void 0 : _g.substring(7));
    const product = yield (0, productServices_1.getProductBarcode)(parseInt(req.params.barcode), dataToken.id);
    if (product != undefined) {
        res.status(200).send(product);
    }
    else {
        res.status(404).send({ "mensaje": "producto no encontrado" });
    }
}));
exports.default = router;
