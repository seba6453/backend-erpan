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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTicketDetail = exports.getTicketDetail = void 0;
const dataBase_1 = require("../dataBase");
const getTicketDetail = (id_ticket) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from ticket_detail where id_ticket = ${id_ticket};`;
    const result = yield dataBase_1.client.query(query);
    const allTicketDetail = result.rows;
    return allTicketDetail;
});
exports.getTicketDetail = getTicketDetail;
const addTicketDetail = (list_detail, id_ticket) => __awaiter(void 0, void 0, void 0, function* () {
    let confi;
    for (let i = 0; i < list_detail.length; i++) {
        const dato = list_detail[i];
        const query = `select insert_ticket_detail(${dato.id_product},${id_ticket},cast(${dato.total_price} as money),${dato.amount});`;
        try {
            const result = yield dataBase_1.client.query(query);
            confi = result.rows[0];
        }
        catch (err) {
            console.error(err);
        }
    }
    return confi;
});
exports.addTicketDetail = addTicketDetail;
