import { User } from "./User";

export interface Resident extends User{
    firstName: string;
    lastName: string;
    address: string;
    apartmentNumber: string;
    moveInDate: Date;
    moveOutDate: Date | null;
}