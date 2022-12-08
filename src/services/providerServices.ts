import {client} from "../dataBase";
import {NewProvider, Provider} from "../types/provider_type";

export const getAll = async (id_business: Number): Promise<Provider[]> => {
    const query = `select * from providers p where p.id_business = ${id_business}`;
    const result = await client.query(query);
    const allProvider = result.rows;
    return allProvider;
};

export const addProvider = async (newProvider: Provider) => {
    const query = `insert into providers(name_providers,id_business) values(upper('${newProvider.name_providers}'),${newProvider.id_business})`;
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

export const updateProvider = async (id: String, updateProvider: NewProvider, id_business: Number) => {
    const query = `update providers set name_providers = upper('${updateProvider.name_providers}') where name_providers = upper('${id}') and id_business = ${id_business}`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const getProvider = async (id: String, id_business: Number): Promise<Provider | undefined> => {
    const query = `select * from providers p where p.id_business = ${id_business} and p.name_providers = upper('${id}')`
    const result = await client.query(query);
    if (result.rowCount >= 1) {
        const provider: Provider = result.rows[0];
        return provider;
    }
    return undefined;
};

export const deleteProvider = async (id: String, id_business: Number) => {
    const query = `DELETE FROM providers WHERE name_providers = upper('${id}') and id_business=${id_business}`;
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;
};

export const searchProvider = async (palabra: String, id_business: Number): Promise<Provider[]> => {
    const query = `select * from providers WHERE name_providers like upper('%${palabra}%') and id_business=${id_business}`;
    const result = await client.query(query);
    const providers = result.rows;
    return providers;
}