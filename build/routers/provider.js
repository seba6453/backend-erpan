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
const providerServices_1 = require("../services/providerServices");
const token_1 = require("../middleware/token");
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
router.use(verifyToken_1.default);
/* This is a route that is used to get all the providers of a business. */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dataToken = (0, token_1.decodeToken)((_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7));
    const providers = yield (0, providerServices_1.getAll)(dataToken.id);
    res.status(200).send(providers);
}));
/* This is a route that is used to add a provider to a business. */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const dataToken = (0, token_1.decodeToken)((_b = req.get("Authorization")) === null || _b === void 0 ? void 0 : _b.substring(7));
    const { name_providers } = req.body;
    const newProvider = {
        name_providers: name_providers,
        id_business: dataToken.id
    };
    if (yield (0, providerServices_1.addProvider)(newProvider)) {
        res.status(200).send(newProvider);
    }
    else {
        res.status(404).send({ "mensaje": "Error al agregar el proveedor" });
    }
}));
/* This is a route that is used to update a provider of a business. */
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const dataToken = (0, token_1.decodeToken)((_c = req.get("Authorization")) === null || _c === void 0 ? void 0 : _c.substring(7));
    const providerUpdate = req.body;
    if (yield (0, providerServices_1.updateProvider)(req.params.id, providerUpdate, dataToken.id)) {
        res.status(200).send(providerUpdate);
    }
    else {
        res.status(404).send({ "mensaje": "Proveedor no actualizado" });
    }
}));
/* This is a route that is used to get a provider of a business. */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const dataToken = (0, token_1.decodeToken)((_d = req.get("Authorization")) === null || _d === void 0 ? void 0 : _d.substring(7));
    const provider = yield (0, providerServices_1.getProvider)(req.params.id, dataToken.id);
    if (provider != undefined) {
        res.status(200).send(provider);
    }
    else {
        res.status(404).send({ "mensaje": "Proveedor no encontrado" });
    }
}));
/* This is a route that is used to delete a provider of a business. */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const dataToken = (0, token_1.decodeToken)((_e = req.get("Authorization")) === null || _e === void 0 ? void 0 : _e.substring(7));
    if (yield (0, providerServices_1.deleteProvider)(req.params.id, dataToken.id)) {
        res.status(200).send(true);
    }
    else {
        res.status(404).send(false);
    }
}));
/* This is a route that is used to search a provider of a business. */
router.get("/search/:search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    const palabra = req.params.search;
    const dataToken = (0, token_1.decodeToken)((_f = req.get("Authorization")) === null || _f === void 0 ? void 0 : _f.substring(7));
    const providers = yield (0, providerServices_1.searchProvider)(palabra, dataToken.id);
    res.status(200).send(providers);
}));
exports.default = router;
