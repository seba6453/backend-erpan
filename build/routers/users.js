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
const userServices_1 = require("../services/userServices");
const router = express_1.default.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userLogin = req.body;
    const userData = yield (0, userServices_1.getUser)(userLogin);
    if (userData != undefined) {
        const UserResponse = {
            name_business: userData.name_business,
            token: "token_express"
        };
        res.status(200).send(UserResponse);
    } else {
        res.status(404).send(undefined);
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    if (yield (0, userServices_1.createUser)(newUser)) {
        const userResponse = {
            name_business: newUser.name_business,
            token: "token_express"
        };
        res.status(200).send(userResponse);
    } else {
        res.status(404).send(false);
    }
}));
exports.default = router;
