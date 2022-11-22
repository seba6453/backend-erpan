import express from "express";
import { decodeToken } from "../middleware/token";
import verifyToken from "../middleware/verifyToken";
//import { verifyStock } from "../services/productServices";
import { addTicketDetail } from "../services/ticketDetailServices";
import { addTicket, deleteTicket, getAll, getTicket } from "../services/ticketServices";
import { NewTicketDetail } from "../types/ticketDetail_types";
import { NewTicket } from "../types/ticket_types";
const dotenv = require('dotenv');


dotenv.config({
    path: './.env'
});

const router = express.Router();
router.use(verifyToken);

/* This is a route that is used to get all the tickets of a business. */
router.get("/",async (req,res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const tickets = await getAll(dataToken.id);
    res.status(200).send(tickets);
})

router.get("/:id",async (req,res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const ticket = await getTicket(parseInt(req.params.id), dataToken.id);
    if (ticket != undefined) {
        res.status(200).send(ticket);
    } else {
        res.status(404).send({"mensaje":"Ticket no encontrado"});
    }
})

/* This is a route that is used to add a new ticket. */
router.post("/",async (req,res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const list_detail: Array<NewTicketDetail> = req.body;

    let total_price = 0;
    list_detail.map((dato:NewTicketDetail) => {
        total_price += dato.total_price;
    })
    const newTicket: NewTicket = {
        id_business: dataToken.id,
        general_price: total_price,
        selled_date: new Date().toLocaleDateString('en-US'),
        selled_time: new Date().toLocaleTimeString('en-US')
    }
    const idTicket = await addTicket(newTicket);
    if(idTicket > -1) {
        const {insert_ticket_detail} = await addTicketDetail(list_detail,idTicket);
        if(!insert_ticket_detail){
            await deleteTicket(parseInt(idTicket),dataToken.id);
            res.status(400).send({"mensaje":"Articulo sin stock"})
        }else{
            res.status(200).send(newTicket)
        }
    }else{
        res.status(400).send({"mensaje":"Error al ingresar un nuevo ticket"})
    }

})


router.delete("/:id",async (req,res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    if (await deleteTicket(parseInt(req.params.id), dataToken.id)) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
});


export default router;