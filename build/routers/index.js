"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./users"));
const ticket_1 = __importDefault(require("./ticket"));
const products_1 = __importDefault(require("./products"));
const router = express_1.default.Router();
router.use("/", users_1.default);
router.use("/ticket", ticket_1.default);
router.use('/products', products_1.default);
exports.default = router;
