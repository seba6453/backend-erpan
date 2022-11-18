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
const tokenServices_1 = require("../services/tokenServices");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({
    path: './..env'
});
const router = express_1.default.Router();
router.use(function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const autorization = req.get('Authorization');
        let token = '';
        if (autorization && autorization.toLowerCase().startsWith('bearer')) {
            token = autorization.substring(7);
        }
        else {
            return res.status(403).send({ message: "Tu petición no tiene cabecera de autorización" });
        }
        //let decodeToken = null;
        try {
            yield jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            if (yield (0, tokenServices_1.existsTokenBlackList)(token)) {
                return res.status(401).send({ message: "Token invalido" });
            }
        }
        catch (e) {
            console.error(e);
            return res.status(401).send({ message: "Token invalido" });
        }
        return next();
    });
});
exports.default = router;
