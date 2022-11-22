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
const verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
//import { verifyStock } from "../services/productServices";
const ticketDetailServices_1 = require("../services/ticketDetailServices");
const ticketServices_1 = require("../services/ticketServices");
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
router.use(verifyToken_1.default);
/* This is a route that is used to get all the tickets of a business. */
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const dataToken = (0, token_1.decodeToken)((_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.substring(7));
    const tickets = yield (0, ticketServices_1.getAll)(dataToken.id);
    res.status(200).send(tickets);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const dataToken = (0, token_1.decodeToken)((_b = req.get("Authorization")) === null || _b === void 0 ? void 0 : _b.substring(7));
    const ticket = yield (0, ticketServices_1.getTicket)(parseInt(req.params.id), dataToken.id);
    if (ticket != undefined) {
        res.status(200).send(ticket);
    }
    else {
        res.status(404).send({ "mensaje": "Ticket no encontrado" });
    }
}));
/* This is a route that is used to add a new ticket. */
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const dataToken = (0, token_1.decodeToken)((_c = req.get("Authorization")) === null || _c === void 0 ? void 0 : _c.substring(7));
    const list_detail = req.body;
    let total_price = 0;
    list_detail.map((dato) => {
        total_price += dato.total_price;
    });
    const newTicket = {
        id_business: dataToken.id,
        general_price: total_price,
        selled_date: new Date().toLocaleDateString('en-US'),
        selled_time: new Date().toLocaleTimeString('en-US')
    };
    const idTicket = yield (0, ticketServices_1.addTicket)(newTicket);
    if (idTicket > -1) {
        const { insert_ticket_detail } = yield (0, ticketDetailServices_1.addTicketDetail)(list_detail, idTicket);
        if (!insert_ticket_detail) {
            yield (0, ticketServices_1.deleteTicket)(parseInt(idTicket), dataToken.id);
            res.status(400).send({ "mensaje": "Articulo sin stock" });
        }
        else {
            res.status(200).send(newTicket);
        }
    }
    else {
        res.status(400).send({ "mensaje": "Error al ingresar un nuevo ticket" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const dataToken = (0, token_1.decodeToken)((_d = req.get("Authorization")) === null || _d === void 0 ? void 0 : _d.substring(7));
    if (yield (0, ticketServices_1.deleteTicket)(parseInt(req.params.id), dataToken.id)) {
        res.status(200).send(true);
    }
    else {
        res.status(404).send(false);
    }
}));
exports.default = router;
