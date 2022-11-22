"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tokenServices_1 = require("../services/tokenServices");
const userServices_1 = require("../services/userServices");
const mailer_1 = require("../config/mailer");
const randomCaracter_1 = require("../config/randomCaracter");
const EmailValidator = __importStar(require("email-validator"));
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
/* This is a login route. */
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogin = req.body;
    const userData = yield (0, userServices_1.getUser)(userLogin);
    if (userData != undefined) {
        const TOKEN = (0, token_1.createToken)(userData);
        const UserResponse = {
            name_business: userData.name_business,
            token: TOKEN
        };
        res.status(200).send(UserResponse);
    }
    else {
        res.status(404).send({ "mensaje": "Error al iniciar sesion" });
    }
}));
/* This is a route that allows you to recover your password. */
router.put("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    if (yield (0, userServices_1.existUser)(email)) {
        const password = (0, randomCaracter_1.randomCaracter)(8);
        if (yield (0, userServices_1.updatePassword)(email, password)) {
            const userLogin = {
                email: email,
                password: password
            };
            const user = yield (0, userServices_1.getUser)(userLogin);
            if (user != undefined) {
                try {
                    yield mailer_1.transporter.sendMail({
                        from: '"Soporte" <soporte.erpan@gmail.com>',
                        to: email,
                        subject: "Recuperacion de contraseña",
                        text: "Hello world?",
                        html: `
                        <h1>Restablecer contraseña</h1>
                        <div>
                            <h3>Hola ${user.name_business}</h3>
                            <p>Tu contraseña provisoria es:</p>
                        </div>
                        <h3>${password}</h3>
                        <div>
                            <p>Luego de ingresar, realiza el cambio de tu contraseña</p>
                        <div>
                        <div>
                            <h4>¿Tienes preguntas?</h4>
                            <p>Contactarse a soporte.erpan@gmail.com</p>
                        <div>
                        `,
                    });
                }
                catch (err) {
                    res.status(404).send({ "mensaje": "Error al solicitar una clave provisoria" });
                }
                res.send({ "mensaje": "Su clave provisoria fue enviada a su correo" });
            }
        }
    }
    else {
        res.status(404).send({ "mensaje": "Este correo no existe" });
    }
}));
/* This is a route that allows you to register a new user. */
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    var user;
    if (EmailValidator.validate(newUser.email)) {
        if (newUser.password === newUser.password_confirm) {
            if (yield (0, userServices_1.createUser)(newUser)) {
                const userLogin = {
                    email: newUser.email,
                    password: newUser.password
                };
                user = yield (0, userServices_1.getUser)(userLogin);
                const TOKEN_TEMPORALS = (0, token_1.createToken)(user);
                const userResponse = {
                    name_business: newUser.name_business,
                    token: TOKEN_TEMPORALS
                };
                res.status(200).send(userResponse);
            }
            else {
                yield (0, userServices_1.deleteUser)(user === null || user === void 0 ? void 0 : user.id);
                res.status(404).send({ "mensaje": "Error al registrar el nuevo usuario" });
            }
        }
        else {
            res.status(404).send({ "mensaje": "Contraseñas no coinciden" });
        }
    }
    else {
        res.status(404).send({ "mensaje": "Correo electronico invalido" });
    }
}));
/* This is a route that allows you to close the session. */
router.post("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.get('Authorization')) === null || _a === void 0 ? void 0 : _a.substring(7);
    if (yield (0, tokenServices_1.addBlackList)(token)) {
        console.log("por aca paso");
        res.status(200).send({ "mensaje": "Session ha expirado" });
    }
    else {
        res.status(400).send({ "mensaje": "No se ha cerrado la session" });
    }
}));
router.get("/verify-token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const token = (_b = req.get('Authorization')) === null || _b === void 0 ? void 0 : _b.substring(7);
    if (token != undefined) {
        if (yield (0, token_1.verifyToken)(token)) {
            res.status(200).send({ "mensaje": "token valido" });
        }
        else {
            res.status(404).send({ "mensaje": "token invalido" });
        }
    }
    else {
        res.status(404).send({ "mensaje": "token invalido" });
    }
}));
exports.default = router;
