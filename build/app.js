"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routers/index"));
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const app = (0, express_1.default)();
//middlewares
app.use(express_1.default.json()); //middleware que trasforma la req.body a un json
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.get('/ping', (_req, res) => {
    console.log("ya esta listo!!! ");
    res.send('pong');
});
/* rutas */
app.use('/api', index_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
});
