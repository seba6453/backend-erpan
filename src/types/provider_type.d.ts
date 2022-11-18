export interface Provider {
    name_providers: String,
    id_business: Number
}

export type NewProvider = Omit<Provider, "id_business">;