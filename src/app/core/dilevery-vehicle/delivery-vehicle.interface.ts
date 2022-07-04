import { BussinessI } from '../common/common.interface';

export interface CreateVehicleRequest {
    vehicleNumber: string;
    vehicleId: string;
    vehicleType: string;
    vehicleColor: string;
}

export interface DeliveryVehicleI {
    _id: string;
    business: string;
    vehicleNumber: string;
    vehicleId: string;
    vehicleType: string;
    // distributor: BussinessI;
    employee: BussinessI;
    vehicleColor: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface VehicleListResponse {
    data: {
        vehicles: {
            results: DeliveryVehicleI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}
export const DisplayedDeliveryVehicleI = [
    'business',
    'vehicleId',
    'vehicleNumber',
    'vehicleType',
    'vehicleColor',
    'createdAt',
    'actions',
];
