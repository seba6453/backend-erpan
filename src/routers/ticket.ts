import express from "express";
import { decodeToken } from "../middleware/token";
import verifyToken from "../middleware/verifyToken";
import { addTicketDetail } from "../services/ticketDetailServices";
import { addTicket, deleteTicket, getAll } from "../services/ticketServices";
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
        await addTicketDetail(list_detail,idTicket);
        res.status(200).send(newTicket)
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