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
exports.deleteTicket = exports.getTicket = exports.addTicket = exports.getAll = void 0;
const dataBase_1 = require("../dataBase");
const getAll = (id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from tickets where id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    const allTicket = result.rows;
    return allTicket;
});
exports.getAll = getAll;
const addTicket = (newTicket) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `insert into tickets(id_business,general_price,selled_date,selled_time) values(${newTicket.id_business},${newTicket.general_price},'${newTicket.selled_date}','${newTicket.selled_time}') returning id`;
    try {
        const result = yield dataBase_1.client.query(query);
        return result.rows[0].id;
    }
    catch (err) {
        console.error(err);
        return -1;
    }
});
exports.addTicket = addTicket;
const getTicket = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `select * from tickets tk where id = ${id} and id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount >= 1) {
        const ticket = result.rows[0];
        return ticket;
    }
    return undefined;
});
exports.getTicket = getTicket;
const deleteTicket = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM tickets WHERE id=${id} and id_business=${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
});
exports.deleteTicket = deleteTicket;
