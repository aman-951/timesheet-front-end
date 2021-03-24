export interface User {
    id?:string,
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    role_id: string,
    role?: string,
    created_at?: Date,
    updated_at?: Date | null
}