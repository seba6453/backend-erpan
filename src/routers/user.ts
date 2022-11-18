import expres from "express";
import {decodeToken} from "../middleware/token";
import {updateUser, verifyPasword} from "../services/userServices";

const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

const router = expres.Router();


/* A router.put method. */
router.put("/change-password", async (req, res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const {password, passwordNew, passwordConfirm} = req.body;

    if (passwordNew === passwordConfirm && await verifyPasword(dataToken.email, password)) {

        if (await updateUser(dataToken.email, passwordNew)) {
            res.status(200).send({"mensaje": "Contraseña actualizada"})
        }
    } else {
        res.status(404).send({"mensaje": "Error al actualizar la contraseña"})
    }

});


export default router;