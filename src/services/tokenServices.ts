import {client} from "../dataBase";


export const existsToken = async (token: string): Promise<boolean> => {
    const query = `select * from token_business where token = '${token}'`
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;

};


export const addBlackList = async (token: string | undefined) => {
    const query = `INSERT INTO token_black_list(token_black) values ('${token}');`
    try {
        await client.query(query);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export const existsTokenBlackList = async (token: string) => {
    const query = `select * from token_black_list where token_black = '${token}'`
    const result = await client.query(query);
    if (result.rowCount > 0) {
        return true;
    }
    return false;

};
