import express from "express";
import verifyToken from "../middleware/verifyToken";
import {addProduct, getAll, getProduct, updateProduct, deleteProduct, searchProduct, getProductBarcode} from "../services/productServices";
import {decodeToken} from "../middleware/token";
import {NewProduct, UpdateProduct} from "../types/product_types";

const dotenv = require('dotenv');


dotenv.config({
    path: './.env'
});

const router = express.Router();
router.use(verifyToken);


/* This is a route that will be used to get all the products. */
router.get("/", async (req, res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const products = await getAll(dataToken.id);
    res.status(200).send(products);
});

/* A route that will be used to add a new product. */
router.post("/", async (req, res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const {id_categories, id_providers, bar_code, stock, name_product, price, cost} = req.body;
    const newProduct: NewProduct = {
        id_business: dataToken.id,
        id_categories: id_categories,
        id_providers: id_providers,
        bar_code: bar_code,
        stock: stock,
        name_product: name_product,
        price: price,
        cost: cost
    };
    if (await addProduct(newProduct)) {
        res.status(200).send(newProduct);
    } else {
        res.status(404).send({"mensaje":"Error al agregar producto"});
    }

});

/* This is a route that will be used to update a product by id. */
router.put("/:id", async (req, res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const productUpdate: UpdateProduct = req.body;
    if (await updateProduct(parseInt(req.params.id), productUpdate, dataToken.id)) {
        res.status(200).send(productUpdate)
    } else {
        res.status(404).send({"mensaje":"Producto no actualizado"});
    }
});

/* This is a route that will be used to get a product by id. */
router.get("/:id", async (req, res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const product = await getProduct(parseInt(req.params.id), dataToken.id);
    if (product != undefined) {
        res.status(200).send(product);
    } else {
        res.status(404).send({"mensaje":"producto no encontrado"});
    }
});

/* A route that will be used to delete a product by id. */
router.delete("/:id", async (req, res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    if (await deleteProduct(parseInt(req.params.id), dataToken.id)) {
        res.status(200).send(true);
    } else {
        res.status(404).send(false);
    }
});

/* This is a route that will be used to search a product by name. */
router.get("/search/:search", async (req, res) => {
    const word = req.params.search.replace("+", " ");
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const products = await searchProduct(word, dataToken.id);
    res.status(200).send(products);
});


router.get("/barcode/:barcode", async (req,res) => {
    const dataToken = decodeToken(req.get("Authorization")?.substring(7));
    const product = await getProductBarcode(parseInt(req.params.barcode), dataToken.id);
    if (product != undefined) {
        res.status(200).send(product);
    } else {
        res.status(404).send({"mensaje":"producto no encontrado"});
    }

});

export default router