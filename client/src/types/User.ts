export interface User {
    userId: string;
    login: string;
    password: string;
    avatarUrl: string;
    role: UserRoles;
    userStatus: UserStatus;
    userCreationDate: Date;
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED = 'BLOCKED',
}


export enum UserRoles {
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER',
    RESIDENT = 'RESIDENT',
    TENANT = 'TENANT',
}

