"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "soporte.erpan@gmail.com",
        pass: "ffwzkycwxxqegnpq", // generated ethereal password
    },
});
exports.transporter.verify().then(() => {
    console.log("Listo para mandar emails");
});
