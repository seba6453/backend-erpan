export interface Product {
    id: Number,
    id_business: Number,
    id_categories: String,
    id_providers: String,
    bar_code: Number,
    stock: Number,
    name_product: String,
    price: Number,
    cost: Number
}

export type NewProduct = Omit<Product, "id">

export type UpdateProduct = Omit<Product, "id" | "id_business">