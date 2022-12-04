import { client } from "../dataBase";
import { NewTicket, Ticket } from "../types/ticket_types";

export const getAll = async (id_business:Number): Promise<Ticket[]> => {
    const query = `select * from tickets ts where ts.id_business = ${id_business} order by ts.id desc`;
    const result = await client.query(query);
    const allTicket = result.rows;
    return allTicket;
}

export const addTicket = async (newTicket: NewTicket) => {
    const query = `insert into tickets(id_business,general_price,selled_date,selled_time) values(${newTicket.id_business},${newTicket.general_price},'${newTicket.selled_date}','${newTicket.selled_time}') returning id`;
    try {
        const result = await client.query(query)
        return result.rows[0].id;
    }catch (err){
        console.error(err);
        return -1;
    }
}

export const getTicket = async (id: Number, id_business: Number): Promise<Ticket | undefined> => {
    const query = `select * from tickets tk where id = ${id} and id_business = ${id_business}`
    const result = await client.query(query);
    if (result.rowCount >= 1) {
        const ticket: Ticket = result.rows[0];
        return ticket;
    }
    return undefined;
}

export const deleteTicket = async (id: Number, id_business: Number) => {
    const query = `DELETE FROM tickets WHERE id=${id} and id_business=${id_business}`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
}
