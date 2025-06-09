import { UserStatus } from './User';

export interface ApartmentTenant {
  tenantId: string;
  name: string;
  status: UserStatus;
}

export interface Apartment {
  id: number;
  buildingId: number;
  number: string;
  tenants: ApartmentTenant[]; // <-- array of tenants
  moveInDate: string;
  moveOutDate?: string;
}