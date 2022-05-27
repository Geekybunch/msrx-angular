export interface Businesses {
    businessIDNumber: number;
    businessName: string;
    businessType: string;
    businessPhone: number;
    businessAddress: string;
    isApproved: boolean;
    createdAt: Date;
    actions: any;
}
export const displayedColumns = [
    'businessIDNumber',
    'businessName',
    'businessType',
    'businessPhone',
    'businessAddress',
    'isApproved',
    // 'createdAt',
    'actions',
];
