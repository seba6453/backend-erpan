import express from "express";
import verifyToken from "../middleware/verifyToken";
import {
    addCategory,
    deleteCategory,
    getAll,
    getCategory,
    searchCategory,
    updateCategory
} from "../services/categoryServices";
import {Category} from "../types/category_types";

const dotenv = require('dotenv');

dotenv.config({
    path: './.env'
});

const router = express.Router();
router.use(verifyToken);

/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/" and the request method is GET. */
router.get("/", async (_req, res) => {
    const categories = await getAll();
    res.status(200).send(categories);
});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/" and the request method is POST. */
router.post("/", async (req, res) => {
    const newCategory: Category = req.body;
    if (await addCategory(newCategory)) {
        res.status(200).send(newCategory);
    } else {
        res.status(404).send({"mensaje":"Error al agregar el Categoria"});
    }
});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/:id" and the request method is PUT. */
router.put("/:id", async (req, res) => {
    const categoryUpdate = req.body;
    if (await updateCategory(req.params.id, categoryUpdate)) {
        res.status(200).send(categoryUpdate);
    } else {
        res.status(404).send({"mensaje":"Categoria no actualizado"});
    }

});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/:id" and the request method is GET. */
router.get("/:id", async (req, res) => {
    const category = await getCategory(req.params.id.toLowerCase());
    if (category != undefined) {
        res.status(200).send(category);
    } else {
        res.status(404).send({"mensaje":"Categoria no encontrado"});
    }
});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/:id" and the request method is DELETE. */
router.delete("/:id", async (req, res) => {
    if (await deleteCategory(req.params.id)) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
});

/* This is a route handler. It is a function that is called when a request is made to the specified
route. In this case, the route is "/search/:search" and the request method is GET. */
router.get("/search/:search", async (req, res) => {
    const palabra = req.params.search;
    const categories = await searchCategory(palabra);
    res.status(200).send(categories);
});

export default router;