export interface User {
    id: number;
    name_business: string;
    email: string;
    password: string;
    password_confirm: String,
    short_name?: string;
}

export interface UserWithToken extends User {
    token: string;
}

export type UserLogin = Omit<User, "id" | "name_business" | "password_confirm" | "short_name">

export type UserResponse = Omit<UserWithToken, "id" | "email" | "password_confirm" | "password" | "short_name">;

export type NewUser = Omit<User, "id">;