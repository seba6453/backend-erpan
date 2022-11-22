export interface Ticket {
    id: Number,
    id_business: Number,
    general_price: number,
    selled_date: String,
    selled_time: String
}

export type NewTicket = Omit<Ticket,"id">;

export type UpdateTicket = Omit<Ticket, "id"|"id_business">;