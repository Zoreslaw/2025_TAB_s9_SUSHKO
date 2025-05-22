import { User } from "./User";

export interface Tenant extends User{
    firstName: string;
    lastName: string;
    email: string;
}