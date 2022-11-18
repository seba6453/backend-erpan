import {client} from "../dataBase";
import {Category} from "../types/category_types";


export const getAll = async (): Promise<Category[]> => {
    const query = `select * from categories`;
    const result = await client.query(query);
    const allCategories = result.rows;
    return allCategories;
};

export const addCategory = async (newCategory: Category) => {
    const query = `insert into categories(name_categories) values(upper('${newCategory.name_categories}'))`;
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const updateCategory = async (id: String, categoryUpdate: Category) => {
    const query = `update categories set name_categories = upper('${categoryUpdate.name_categories}') where name_categories = upper('${id}')`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const getCategory = async (id: String): Promise<Category | undefined> => {
    const query = `select * from categories where name_categories = upper('${id}')`;
    const result = await client.query(query);
    if (result.rowCount >= 1) {
        const category: Category = result.rows[0];
        return category;
    }
    return undefined;
};

export const deleteCategory = async (id: String) => {
    const query = `delete from categories where name_categories = upper('${id}')`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};


export const searchCategory = async (palabra: String): Promise<Category[]> => {
    const query = `select * from categories WHERE name_categories like upper('%${palabra}%')`;
    const result = await client.query(query);
    const providers = result.rows;
    return providers;
}