import express from "express";
import {createToken, verifyToken} from "../middleware/token";
import {addBlackList} from "../services/tokenServices";
import {createUser, deleteUser, existUser, getUser, updatePassword} from '../services/userServices';
import {NewUser, User, UserLogin, UserResponse} from "../types/user_types";
import {transporter} from "../config/mailer";
import {randomCaracter} from "../config/randomCaracter";
import * as EmailValidator from 'email-validator';

const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});


const router = express.Router();


/* This is a login route. */
router.post("/login", async (req, res) => {
    const userLogin: UserLogin = req.body;
    const userData = await getUser(userLogin);
    if (userData != undefined) {
        const TOKEN = createToken(userData);
        const UserResponse: UserResponse = {
            name_business: userData.name_business,
            token: TOKEN
        }
        res.status(200).send(UserResponse)

    } else {
        res.status(404).send({"mensaje": "Error al iniciar sesion"})
    }

});

/* This is a route that allows you to recover your password. */
router.put("/forgot-password", async (req, res) => {

    const {email} = req.body;

    if (await existUser(email)) {
        const password = randomCaracter(8);
        if (await updatePassword(email, password)) {
            const userLogin: UserLogin = {
                email: email,
                password: password
            };
            const user: User | undefined = await getUser(userLogin);
            if (user != undefined) {
                try {
                    await transporter.sendMail({
                        from: '"Soporte" <soporte.erpan@gmail.com>', // sender address
                        to: email, // list of receivers
                        subject: "Recuperacion de contraseña", // Subject line
                        text: "Hello world?", // plain text body
                        html: `
                        <h1>Restablecer contraseña</h1>
                        <div>
                            <h3>Hola ${user.name_business}</h3>
                            <p>Tu contraseña provisoria es:</p>
                        </div>
                        <h3>${password}</h3>
                        <div>
                            <p>Luego de ingresar, realiza el cambio de tu contraseña</p>
                        <div>
                        <div>
                            <h4>¿Tienes preguntas?</h4>
                            <p>Contactarse a soporte.erpan@gmail.com</p>
                        <div>
                        `,
                    });
                } catch (err) {
                    res.status(404).send({"mensaje": "Error al solicitar una clave provisoria"})
                }
                res.send({"mensaje": "Su clave provisoria fue enviada a su correo"})
            }
        }
    } else {
        res.status(404).send({"mensaje": "Este correo no existe"})
    }


});

/* This is a route that allows you to register a new user. */
router.post("/register", async (req, res) => {
    const newUser: NewUser = req.body;
    var user: User | undefined;

    if (EmailValidator.validate(newUser.email)) {
        if (newUser.password === newUser.password_confirm) {
            if (await createUser(newUser)) {
                const userLogin: UserLogin = {
                    email: newUser.email,
                    password: newUser.password
                };
                user = await getUser(userLogin);
                const TOKEN_TEMPORALS = createToken(user);
                const userResponse: UserResponse = {
                    name_business: newUser.name_business,
                    token: TOKEN_TEMPORALS
                };
                res.status(200).send(userResponse);
            } else {
                await deleteUser(user?.id)
                res.status(404).send({"mensaje": "Error al registrar el nuevo usuario"});
            }
        } else {
            res.status(404).send({"mensaje": "Contraseñas no coinciden"})
        }
    } else {
        res.status(404).send({"mensaje": "Correo electronico invalido"})
    }


});

/* This is a route that allows you to close the session. */
router.post("/logout", async (req, res) => {
    const token = req.get('Authorization')?.substring(7);
    if (await addBlackList(token)) {
        console.log("por aca paso")
        res.status(200).send({"mensaje":"Session ha expirado"});
    } else {
        res.status(400).send({"mensaje":"No se ha cerrado la session"});
    }
});

router.get("/verify-token", async(req,res) => {
    const token = req.get('Authorization')?.substring(7);
    if(token != undefined){
        if(await verifyToken(token)){
            res.status(200).send({"mensaje":"token valido"});
        }else{
            res.status(404).send({"mensaje":"token invalido"});
        }
    }else{
        res.status(404).send({"mensaje":"token invalido"});
    }
    

})


export default router;