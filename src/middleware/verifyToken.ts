import express from "express";
import {existsTokenBlackList} from "../services/tokenServices";

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({
    path: './..env'
});


const router = express.Router();

router.use(async function (req, res, next) {
    const autorization = req.get('Authorization');
    let token = ''
    if (autorization && autorization.toLowerCase().startsWith('bearer')) {
        token = autorization.substring(7);
    } else {
        return res.status(403).send({message: "Tu petición no tiene cabecera de autorización"});
    }
    //let decodeToken = null;
    try {
        await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        if (await existsTokenBlackList(token)) {
            return res.status(401).send({message: "Token invalido"});
        }
    } catch (e) {
        console.error(e);
        return res.status(401).send({message: "Token invalido"});
    }

    return next();

});

export default router;