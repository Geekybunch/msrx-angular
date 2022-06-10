import { EmployeeI } from '../auth/auth.interface';

export interface BussinessI {
    isApproved: boolean;
    _id: string;
    businessName: string;
    businessIDNumber: string;
    businessAddress: string;
    businessPhone: string;
    businessType: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PlantTestI {
    _id: string;
    tester: BussinessI;
    employee: EmployeeI;
    approved: boolean;
    notes: string;
    testDateTime: Date;
    coa: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PlantProcessI {
    _id: string;
    processor: BussinessI;
    employee: EmployeeI;
    extractionMethodUsed: string;
    ingredients: string;
    approved: boolean;
    processDateTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface CommonPlantDetailI {
    _id: string;
    grower: BussinessI;
    employee: EmployeeI;
    batchNumber: string;
    geneticStain: string;
    geneticCompany: string;
    nutrientManufacture: string;
    phase: string;
    wetWeight: string;
    dryWeight: string;
    createdAt: Date;
    updatedAt: Date;
    plantTest?: PlantTestI;
    plantProcess?: PlantProcessI;
}

export interface CommonPLantDetailResponse {
    data: {
        plant: CommonPlantDetailI;
    };
}

export interface CommonPlantListResponse {
    data: {
        plants: {
            results: CommonPlantDetailI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface ProductI {
    ingredients: string[];
    allergies: string[];
    _id: string;
    name: string;
    description: string;
    sku: string;
    plants: string[];
    manufacturer: BussinessI;
    employee: BussinessI;
    createdAt: Date;
    dosage: number;
    updatedAt: Date;
}

export interface CommonProductDetailI {
    data: {
        product: ProductI;
    };
}

export interface DispensarySearchI {
    location: {
        type: string;
        coordinates: number[];
    };
    avgRating: number;
    _id: string;
    business: BussinessI;
    city: string;
    closeTime: string;
    name: string;
    openTime: string;
    state: string;
    addressLine1: string;
}

export interface DispensariesListResponse {
    data: {
        dispensaries: {
            results: DispensarySearchI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface BookFilterI {
    name: string;
    city: string;
    distance: number;
    address: string;
    zipCode: string;
    location: string;
}
