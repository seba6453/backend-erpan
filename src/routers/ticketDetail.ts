import express from "express";
import verifyToken from "../middleware/verifyToken";
import { getTicketDetail } from "../services/ticketDetailServices";

const dotenv = require('dotenv');


dotenv.config({
    path: './.env'
});

const router = express.Router();
router.use(verifyToken);

router.get("/:id_ticket", async (req,res) => {
    const id_ticket = req.params.id_ticket;
    const ticketsDetail = await getTicketDetail(parseInt(id_ticket));
    if(ticketsDetail.length > 0){
        res.status(200).send(ticketsDetail);
    }else{
        res.status(400).send({"mensaje":"Tikcet no encontrado"})
    }
});

export default router