import { client } from "../dataBase";
import { NewTicketDetail, TicketDetail } from "../types/ticketDetail_types";

export const getTicketDetail = async (id_ticket:Number): Promise<TicketDetail[]> => {
    const query = `select * from ticket_detail where id_ticket = ${id_ticket};`
    const result = await client.query(query);
    const allTicketDetail = result.rows;
    return allTicketDetail;
}

export const addTicketDetail = async (list_detail: Array<NewTicketDetail>,id_ticket:Number) => {
    list_detail.map(async (dato:NewTicketDetail) => {
        const query = `insert into ticket_detail(id_product,id_ticket,total_price,amount) values(${dato.id_product},${id_ticket},${dato.total_price},${dato.amount});`;
        try{
            await client.query(query);
        }catch (err){
            console.error(err);
        }
    });
};