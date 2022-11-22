export interface Product {
    id: Number,
    id_business: Number,
    id_categories: String,
    id_providers: String,
    bar_code: Number,
    stock: number,
    name_product: String,
    price: number,
    cost: number
}

export type NewProduct = Omit<Product, "id">

export type UpdateProduct = Omit<Product, "id" | "id_business">