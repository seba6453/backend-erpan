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
const ticketDetailServices_1 = require("../services/ticketDetailServices");
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});
const router = express_1.default.Router();
router.use(verifyToken_1.default);
router.get("/:id_ticket", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_ticket = req.params.id_ticket;
    const ticketsDetail = yield (0, ticketDetailServices_1.getTicketDetail)(parseInt(id_ticket));
    if (ticketsDetail.length > 0) {
        res.status(200).send(ticketsDetail);
    }
    else {
        res.status(400).send({ "mensaje": "Tikcet no encontrado" });
    }
}));
exports.default = router;
