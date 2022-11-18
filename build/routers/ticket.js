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
const ticketServices_1 = require("../services/ticketServices");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const {id_business} = req.body;
    const allTickets = yield (0, ticketServices_1.getAll)(id_business);
    res.send(allTickets);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const {id_business} = req.body;
    const ticket = yield (0, ticketServices_1.getTicket)(parseInt(req.params.id), id_business);
    if (ticket != undefined) {
        res.status(200).send(ticket);
    } else {
        res.status(404).send(undefined);
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTicket = req.body;
    if (yield (0, ticketServices_1.addTicket)(newTicket)) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticketUpdate = req.body;
    if (yield (0, ticketServices_1.updateTicket)(parseInt(req.params.id), ticketUpdate)) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield (0, ticketServices_1.deleteTicket)(parseInt(req.params.id))) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
}));
exports.default = router;
