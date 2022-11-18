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
const token_1 = require("../middleware/token");
const userServices_1 = require("../services/userServices");
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
/* A router.put method. */
router.put("/change-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dataToken = (0, token_1.decodeToken)((_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7));
    const { password, passwordNew, passwordConfirm } = req.body;
    if (passwordNew === passwordConfirm && (yield (0, userServices_1.verifyPasword)(dataToken.email, password))) {
        if (yield (0, userServices_1.updatePassword)(dataToken.email, passwordNew)) {
            res.status(200).send({ "mensaje": "Contraseña actualizada" });
        }
    }
    else {
        res.status(404).send({ "mensaje": "Error al actualizar la contraseña" });
    }
}));
exports.default = router;
