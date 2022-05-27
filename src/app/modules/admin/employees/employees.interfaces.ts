export interface Employees {
    idNumber: string;
    name: string;
    type: string;
    createdAt: Date;
    isApproved: boolean;
    actions: any;
}

export const displayedColumns = [
    'idNumber',
    'name',
    'type',
    'isApproved',

    // 'createdAt',
    'actions',
];
