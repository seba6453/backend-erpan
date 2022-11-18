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
const categoryServices_1 = require("../services/categoryServices");
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
router.use(verifyToken_1.default);
/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/" and the request method is GET. */
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categoryServices_1.getAll)();
    res.status(200).send(categories);
}));
/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/" and the request method is POST. */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = req.body;
    if (yield (0, categoryServices_1.addCategory)(newCategory)) {
        res.status(200).send(newCategory);
    }
    else {
        res.status(404).send({ "mensaje": "Error al agregar el Categoria" });
    }
}));
/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/:id" and the request method is PUT. */
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryUpdate = req.body;
    if (yield (0, categoryServices_1.updateCategory)(req.params.id, categoryUpdate)) {
        res.status(200).send(categoryUpdate);
    }
    else {
        res.status(404).send({ "mensaje": "Categoria no actualizado" });
    }
}));
/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/:id" and the request method is GET. */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, categoryServices_1.getCategory)(req.params.id.toLowerCase());
    if (category != undefined) {
        res.status(200).send(category);
    }
    else {
        res.status(404).send({ "mensaje": "Categoria no encontrado" });
    }
}));
/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/:id" and the request method is DELETE. */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, categoryServices_1.deleteCategory)(req.params.id)) {
        res.status(200).send(true);
    }
    else {
        res.status(404).send(false);
    }
}));
/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/search/:search" and the request method is GET. */
router.get("/search/:search", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const palabra = req.params.search;
    const categories = yield (0, categoryServices_1.searchCategory)(palabra);
    res.status(200).send(categories);
}));
exports.default = router;
