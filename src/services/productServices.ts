import {client} from "../dataBase";
import {Category} from "../types/category_types";
import {NewProduct, Product, UpdateProduct} from "../types/product_types";
import {Provider} from "../types/provider_type";
import {getCategory, addCategory} from "./categoryServices";
import {addProvider, getProvider} from "./providerServices";

/**
 * If the provider doesn't exist, create it.
 * @param {NewProduct | Product} product - NewProduct | Product
 */
const verifyProvier = async (product: NewProduct | Product) => {
    if (await getProvider(product.id_providers, product.id_business) === undefined) {
        const newProvider: Provider = {
            id_business: product.id_business,
            name_providers: product.id_providers
        };
        await addProvider(newProvider);
    }
}

/**
 * If the category doesn't exist, create it.
 * @param {NewProduct | Product} product - NewProduct | Product
 */
const verifyCategories = async (product: NewProduct | Product) => {
    if (await getCategory(product.id_categories) === undefined) {
        const newCategory: Category = {
            name_categories: product.id_categories
        }
        await addCategory(newCategory)
    }
}


export const getAll = async (id_business: Number): Promise<Product[]> => {
    const query = `SELECT * FROM products pr where id_business = ${id_business}`;
    const result = await client.query(query);
    const allProducts = result.rows;
    return allProducts;
};

export const addProduct = async (newProduct: NewProduct) => {
    await verifyCategories(newProduct);
    await verifyProvier(newProduct);

    const query = `INSERT INTO products (id_business,id_categories,id_providers,bar_code,stock,name_product,price,cost) VALUES(${newProduct.id_business},'${newProduct.id_categories.toUpperCase()}','${newProduct.id_providers.toUpperCase()}',${newProduct.bar_code},${newProduct.stock},'${newProduct.name_product.toLowerCase()}',${newProduct.price},${newProduct.cost});`
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const getProduct = async (id: Number, id_business: Number): Promise<Product | undefined> => {
    const query = `select * from products pr where id = ${id} and id_business = ${id_business}`
    const result = await client.query(query);
    if (result.rowCount >= 1) {
        const product: Product = result.rows[0];
        return product;
    }
    return undefined;
};

export const getProductBarcode = async (barcode: Number,id_business: Number) => {
    const query = `select * from products pr where bar_code = ${barcode} and id_business = ${id_business}`
    const result = await client.query(query);
    if (result.rowCount >= 1) {
        const product: Product = result.rows[0];
        return product;
    }
    return undefined;
}

export const updateProduct = async (id: Number, updateProduct: UpdateProduct, id_business: Number) => {
    const query = `UPDATE public.products SET name_product='${updateProduct.name_product.toLowerCase()}',id_categories = upper('${updateProduct.id_categories}'),id_providers = upper('${updateProduct.id_providers}'),bar_code=${updateProduct.bar_code},price=${updateProduct.price},cost=${updateProduct.cost},stock=${updateProduct.stock} WHERE id=${id} and id_business=${id_business};`
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;

};

export const deleteProduct = async (id: Number, id_business: Number) => {
    const query = `DELETE FROM products WHERE id=${id} and id_business=${id_business}`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
}


export const searchProduct = async (palabra: String, id_business: Number): Promise<Product[]> => {
    const query = `select * from products pr where pr.id_business = ${id_business} and pr.id_categories like upper('%${palabra}%') or pr.id_providers like upper('%${palabra}%') or pr.name_product like lower('%${palabra}%');`
    const result = await client.query(query);
    const products = result.rows;
    return products;
}

export const verifyStock = async (id:Number, count: number, id_business: Number) => {
    const query = `select * from products pr where id = ${id} and id_business = ${id_business};`
    const result = await client.query(query);
    if (result.rowCount > 0) {
        const product:Product = result.rows[0];
        if(product.stock - count >= 0){
            return true
        }
    }
    return false;
}