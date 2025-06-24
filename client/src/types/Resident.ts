import { User } from "./User";

export interface Resident extends User {
    residentId: string;
    userId: string;
    apartmentId: string;
    firstName: string;
    lastName: string;
    address: string;
    apartmentNumber: string;
    moveInDate: Date;
    residentStatus: ResidentStatus;
    moveOutDate?: Date;
}

export enum ResidentStatus {
    ACTIVE = 'ACTIVE',
    FORMER = 'FORMER',
    PENDING = 'PENDING'
}
