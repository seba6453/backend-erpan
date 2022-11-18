"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomCaracter = void 0;
const randomCaracter = (longitud) => {
    const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let random = "";
    for (let i = 0; i < longitud; i++) {
        random += banco.charAt(Math.floor(Math.random() * banco.length));
    }
    return random;
};
exports.randomCaracter = randomCaracter;
