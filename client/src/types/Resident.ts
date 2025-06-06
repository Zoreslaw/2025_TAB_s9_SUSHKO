export interface Resident {
    residentId: string;
    userId: string;
    apartmentId: string;
    moveInDate: Date;
    residentStatus: ResidentStatus;
    moveOutDate?: Date;
}

export enum ResidentStatus {
    ACTIVE = 'ACTIVE',
    FORMER = 'FORMER',
    PENDING = 'PENDING'
} 