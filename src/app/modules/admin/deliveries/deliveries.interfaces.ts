export interface Deliveries {
    businessName: string;
    businessPhone: number;
    vehicleNumber: string;
    vehicleColor: string;

    vehicleType: string;
    pickUpLocation: string;
    dropLocation: string;
    actions: any;
}

export const displayedColumns = [
    'businessName',
    'businessPhone',
    'vehicleNumber',
    'vehicleColor',

    'vehicleType',
    'pickUpLocation',

    'dropLocation',

    'actions',
];
