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
Object.defineProperty(exports, "__esModule", {value: true});
exports.deleteTicket = exports.updateTicket = exports.addTicket = exports.getTicket = exports.getAll = void 0;
const dataBase_1 = require("../dataBase");
/**
 * This function returns all the tickets of a business
 * @param {number} id_business - number
 * @returns An array of Ticket objects.
 */
const getAll = (id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM tickets WHERE id_business=${id_business}`;
    const result = yield dataBase_1.client.query(query);
    const allTickets = result.rows;
    return allTickets;
});
exports.getAll = getAll;
/**
 * It returns a ticket if it exists, otherwise it returns undefined
 * @param {number} id - number, id_business: number
 * @param {number} id_business - number
 * @returns A promise that resolves to a ticket or undefined.
 */
const getTicket = (id, id_business) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT * FROM tickets WHERE id =${id} AND id_business = ${id_business}`;
    const result = yield dataBase_1.client.query(query);
    if (result.rowCount > 0) {
        const ticket = result.rows[0];
        return ticket;
    }
    return undefined;
});
exports.getTicket = getTicket;
/**
 * It takes a newTicket object, which is of type NewTicket, and inserts it into the database.
 * @param {NewTicket} newTicket - NewTicket
 * @returns A promise that resolves to a boolean.
 */
const addTicket = (newTicket) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `insert into tickets(id_business,general_price,selled_date) values (${newTicket.id_business},${newTicket.general_price},'${newTicket.selled_date}');`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

});
exports.addTicket = addTicket;
/**
 * It updates a ticket in the database
 * @param {number} id - number
 * @param {TicketUpdate} ticketUpdate
 * @returns A boolean value.
 */
const updateTicket = (id, ticketUpdate) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `update tickets set general_price = ${ticketUpdate.general_price}, selled_date = '${ticketUpdate.selled_date}' where id = ${id};`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

});
exports.updateTicket = updateTicket;
/**
 * It deletes a ticket from the database.
 * @param {number} id - number
 * @returns A boolean value.
 */
const deleteTicket = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `DELETE FROM tickets WHERE id = ${id};`;
    try {
        yield dataBase_1.client.query(query);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }

});
exports.deleteTicket = deleteTicket;
