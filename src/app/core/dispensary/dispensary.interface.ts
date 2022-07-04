import { BussinessI } from '../common/common.interface';
import { PrescriptionI } from '../wellness/wellness.interface';

export interface GiveDosageRequest {
    // dispensary: string;
    products: {
        product: string;
        quantity: number;
    }[];
}

export interface DispensaryDashboardResponse {
    data: {
        dispensaryStats: {
            _id: string;
            count: number;
            date: string;
        }[];
        visitsCount: number;
    };
}

export interface DispensaryProfileI {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    state: string;
    openTime: string;
    closeTime: string;
    avgRating: number;
    business: string;
    location: {
        type: string;
        coordinates: number[];
    };
    about: string;
    _id: string;
}

export interface DispensaryProfileResponse {
    data: {
        dispensary: DispensaryProfileI;
    };
}

export interface AddDispensaryDetails {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    state: string;
    openTime: string;
    closeTime: string;
    timeSlotLength: number;
    avgRating: number;
    business: string;
    location: {
        type: string;
        coordinates: number[];
    };
    about: string;
}

export interface DosageHistoryResponse {
    data: {
        prescriptions: {
            results: PrescriptionI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export const DosageHistory = [
    'name',
    'dosage',
    'wellnessCenter',
    'description',
    'createdAt',
    'actions',
];
