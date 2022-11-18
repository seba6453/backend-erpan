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
    list_detail.map((dato) => __awaiter(void 0, void 0, void 0, function* () {
        const query = `insert into ticket_detail(id_product,id_ticket,total_price,amount) values(${dato.id_product},${id_ticket},${dato.total_price},${dato.amount});`;
        try {
            yield dataBase_1.client.query(query);
        }
        catch (err) {
            console.error(err);
        }
    }));
});
exports.addTicketDetail = addTicketDetail;
