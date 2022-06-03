export interface Deliveries {
    businessName: string;
    pickUpLocation: string;
    dropLocation: string;
    createdAt: Date;
    actions: any;
}

export const displayedColumns = [
    'businessName',
    'pickUpLocation',
    'dropLocation',
    'createdAt',
    'actions',
];
