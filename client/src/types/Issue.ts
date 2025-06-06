export interface Issue {
    issueId: string;
    issuerId: string;
    operatorId?: string;
    description: string;
    status: IssueStatus;
    type: IssueType;
    creationDate: Date;
    updateDate?: Date;
}

export enum IssueStatus {
    NEW = 'NEW',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CANCELLED = 'CANCELLED'
}

export enum IssueType {
    MAINTENANCE = 'MAINTENANCE',
    PAYMENT = 'PAYMENT',
    OTHER = 'OTHER'
} 