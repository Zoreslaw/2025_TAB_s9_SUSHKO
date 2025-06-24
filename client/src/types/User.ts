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
    ACTIVE = 'aktywny',
    INACTIVE = 'nieaktywny',
    BLOCKED = 'zablokowany',
}


export enum UserRoles {
    ADMIN = 'admin',
    MANAGER = 'menadżer',
    RESIDENT = 'mieszkaniec',
    TENANT = 'najemca',
}

