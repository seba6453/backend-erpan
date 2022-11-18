const {Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});


/* conexion a base datos de railway de michea */
const connectionData = {
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
};


export const client = new Pool(connectionData);
 
