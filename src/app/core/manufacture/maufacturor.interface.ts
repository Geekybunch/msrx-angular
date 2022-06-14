import { ChartSerisResponseI } from 'app/shared/shared.interface';
import { EmployeeI } from '../auth/auth.interface';
import { BussinessI } from '../common/common.interface';

export interface CreateProductsRequest {
    name: string;
    description: string;
    sku: string;
    ingredients: string[];
    dosage: number;
    allergies: string[];
    plants: string[];
}

export interface MaufacturedProductI {
    ingredients: string[];
    allergies: any[];
    _id: string;
    name: string;
    description: string;
    sku: string;
    plants: string[];
    manufacturer: BussinessI;
    employee: EmployeeI;
    createdAt: Date;
    updatedAt: Date;
}

export interface ManufactuedListResponse {
    data: {
        products: {
            results: MaufacturedProductI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface ManufactrorDashboardDataResponse {
    data: {
        productCount: number;
        productsAdded: ChartSerisResponseI[];
        deliveriesDoneCount: number;
        deliveriesDone: any[];
    };
}

export const DisplayedManufactrors = [
    'name',
    'sku',
    'ingredients',
    'description',
    'dosage',
    'actions',
];
