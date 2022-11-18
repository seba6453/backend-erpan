import { Product } from "./product_types";

export interface TicketDetail {
    id: Number,
    product_id: Number,
    product: Product,
    id_ticket: Number,
    total_price: number,
    amount: number
}

export type NewTicketDetail = Omit<TicketDetail,"id","id_ticket">;