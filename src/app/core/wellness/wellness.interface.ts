import { EmployeeI, Employer, ModelId } from '../auth/auth.interface';
import { BookingI } from '../booking/booking.interfaces';
import { BussinessI, ProductI } from '../common/common.interface';
import { DispensaryProfileI } from '../dispensary/dispensary.interface';

export interface AddWelnessDetails {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    openTime: string;
    closeTime: string;
    timeSlotLength: number;
    avgRating: number;
    business: string;
    zipCode: string;
    location: {
        type: string;
        coordinates: number[];
    };
    about: string;
    workingDays: string[];
}

export interface WellnessCenterI {
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    openTime: string;
    closeTime: string;
    timeSlotLength: number;
    avgRating: number;
    zipCode: string;
    business: string;
    location: {
        type: string;
        coordinates: number[];
    };
    about: string;
    _id: string;
    workingDays: string[];
}

export interface GetWellnessProfileResponse {
    data: {
        wellnessCenter: WellnessCenterI;
    };
}

// export interface SearchWellnessProfileResponse {
//     data: {
//         wellnessCenter: WellnessCenterI[];
//     };
// }

export interface SearchWellnessProfileResponse {
    data: {
        wellnessCenter: {
            results: WellnessCenterI[];
            page: number;
            limit: number;
            totalResults: number;
            totalPages: number;
        };
    };
}

export interface WellnessStatusI {
    todayTotal: number;
    monthTotal: number;
    weekTotal: number;
    todayPending: number;
    monthPending: number;
    weekPending: number;
}

export interface WellnessCenterStatResponse {
    data: WellnessStatusI;
}

export interface PrescriptionI {
    createdAt: string;
    signedBy: ModelId[];
    isActive: boolean;
    _id: string;
    booking: BookingI;
    description: string;
    dosage: number;
    dispensaryDetails: DispensaryDetailI[];
}

export interface DispensaryDetailI {
    _id: string;
    dispensary: DispensaryProfileI;
    products: {
        _id: string;
        product: ProductI;
        quantity: number;
    }[];
    updatedAt: Date;
    createdAt: Date;
}

export interface GetPrescriptionResponse {
    data: {
        prescription: PrescriptionI;
    };
}

export interface GetBookingResponse {
    data: {
        booking: BookingI;
    };
}

export interface SearchDispensaryI {
    location: {
        type: string;
        coordinates: number[];
    };
    avgRating: number;
    _id: string;
    business: BussinessI;
    addressLine1: string;
    city: string;
    closeTime: string;
    name: string;
    openTime: string;
    state: string;
}

export interface SearchDispensaryResponse {
    data: {
        dispensaries: {
            results: SearchDispensaryI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface CommonBusinessResponse {
    data: {
        businesses: {
            results: BussinessI[];
            page: number;
            limit: number;
            totalPages: number;
            totalResults: number;
        };
    };
}

export interface CityJSONFile {
    [key: string]: string[];
}

export interface AvailableSlot {
    timeSlotStart: string;
    timeSlotEnd: string;
}

export interface WellnessCenterSlotsResponse {
    data: {
        availableSlots: AvailableSlot[];
    };
    message: string;
}
