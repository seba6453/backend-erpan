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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //debe retornar los datos del producto creado
    //debe acceder con token
}));
router.get("/", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //request vacia
    //obtiene todos los productos del usuario
    //debe acceder con token
}));
router.put("/:id", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //:id debe ser un parametro
    //debe retornar los datos del producto actualizado con id==":id"
    //debe acceder con token
}));
router.get("/:id", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //:id debe ser un parametro
    //request vacia
    //debe retornar los datos del producto con id==":id"
    //debe acceder con token
}));
router.delete("/:id", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //:id debe ser un parametro
    //debe retornar true si se elimino correctamente
    //debe acceder con token
}));
router.get("/search/:search", (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //:search debe ser un parametro
    //debe retornar todos los productos que tengan la subcadena :search,
    //    ya sea en el nombre, categoria, o proveedor
}));
exports.default = router;
