var nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "soporte.erpan@gmail.com", // generated ethereal user
        pass: "ffwzkycwxxqegnpq", // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log("Listo para mandar emails")
})