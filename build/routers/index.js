"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./auth"));
const products_1 = __importDefault(require("./products"));
const provider_1 = __importDefault(require("./provider"));
const category_1 = __importDefault(require("./category"));
const user_1 = __importDefault(require("./user"));
const ticket_1 = __importDefault(require("./ticket"));
const ticketDetail_1 = __importDefault(require("./ticketDetail"));
const router = express_1.default.Router();
/* A way to organize your routes. */
router.use("/", auth_1.default);
router.use('/products', products_1.default);
router.use('/providers', provider_1.default);
router.use('/categories', category_1.default);
router.use('/user', user_1.default);
router.use("/tickets", ticket_1.default);
router.use("/ticket-detail", ticketDetail_1.default);
exports.default = router;
