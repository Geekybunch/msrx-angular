import { BussinessI } from '../common/common.interface';

/* eslint-disable @typescript-eslint/naming-convention */
export interface CreateDileveryI {
    from: string;
    to: string;
    pickUpLocation: string;
    pickUpDateTime: string;
    dropLocation: string;
    vehicle: string;
    dropDateTime: string;
    materials: {
        materialId: string;
        onModel: 'Product' | 'Plant';
        quantity: number;
    }[];
}

export interface DeliveryI {
    fromApproved: boolean;
    toApproved: boolean;
    _id: string;
    from: BussinessI;
    to: BussinessI;
    pickUpLocation: string;
    pickUpDateTime: Date;
    dropLocation: string;
    dropDateTime: Date;
    materials: {
        _id: string;
        materialId: string;
        onModel: string;
    }[];
    creator: string;
    business: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface DeliveriesResponseI {
    data: {
        deliveries: {
            results: DeliveryI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface DeliveryDashboardResponse {
    data: {
        deliveryDoneCount: number;
        deliveryDone: {
            _id: string;
            count: number;
        }[];
    };
}

export const DisplayedDileveryI = [
    'from',
    'to',
    'pickUpLocation',
    'pickUpDateTime',
    'dropLocation',
    'dropDateTime',
];
